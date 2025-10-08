import { DmlParseError } from "@disco/error"
import {
	Location, LocationSpan
} from "@disco/lang/location"
import {
	Token
} from "@tokenizer/token"
import {
	booleanLiteral,
	comment,
	commentMultiline,
	commentXml,
	identifier,
	nullLiteral,
	numberLiteral,
	stringLiteral,
	tagAttributeAssignment,
	tagBracketClose, tagBracketOpen,
	tagClosingSlash,
	TokenType,
	whitespace
} from "@tokenizer/tokenTypes"

enum TokenizerState {
	// General
	Body,

	// Literals
	StringLiteral,
	NumberLiteral,
	BooleanLiteral,
	NullLiteral,

	// Tag Components
	TagOpen,
	TagMiddle,
	TagClose,
	TagAttributeName,
	TagAttributeAssignment,
	TagAttributeValue
}

const StateTypeMap: Map<TokenizerState, Map<TokenType, TokenizerState>> = new Map( [
	[ TokenizerState.Body, new Map<TokenType, TokenizerState>( [
		[ TokenType.TagBracketOpen, TokenizerState.TagOpen ]
	] ) ],

	[ TokenizerState.TagOpen, new Map<TokenType, TokenizerState>( [
		[ TokenType.TagBracketClose, TokenizerState.Body ],
		[ TokenType.Whitespace, TokenizerState.TagMiddle ]
	] ) ],

	[ TokenizerState.TagMiddle, new Map<TokenType, TokenizerState>( [
		[ TokenType.TagBracketClose, TokenizerState.Body ],
		[ TokenType.TagSelfClosingSlash, TokenizerState.TagClose ],
		[ TokenType.TagAttributeIdentifier, TokenizerState.TagAttributeName ]
	] ) ],

	[ TokenizerState.TagClose, new Map<TokenType, TokenizerState>( [
		[ TokenType.TagBracketClose, TokenizerState.Body ]
	] ) ],

	[ TokenizerState.TagAttributeName, new Map<TokenType, TokenizerState>( [
		[ TokenType.TagAttributeAssignment, TokenizerState.TagAttributeAssignment ]
	] ) ],

	[ TokenizerState.TagAttributeAssignment, new Map<TokenType, TokenizerState>( [
		[ TokenType.StringLiteral, TokenizerState.TagAttributeValue ]
	] ) ],

	[ TokenizerState.TagAttributeValue, new Map<TokenType, TokenizerState>( [
		[ TokenType.TagBracketClose, TokenizerState.Body ],
		[ TokenType.TagSelfClosingSlash, TokenizerState.TagClose ],
		[ TokenType.Whitespace, TokenizerState.TagMiddle ]
	] ) ]
] )

const TypePatternMap: Map<TokenType, RegExp> = new Map( [
	[ TokenType.TagIdentifier, identifier ],
	[ TokenType.TagAttributeIdentifier, identifier ],
	[ TokenType.StringLiteral, stringLiteral ],
	[ TokenType.NumberLiteral, numberLiteral ],
	[ TokenType.BooleanLiteral, booleanLiteral ],
	[ TokenType.NullLiteral, nullLiteral ],
	[ TokenType.Whitespace, whitespace ],
	[ TokenType.Comment, comment ],
	[ TokenType.XmlComment, commentXml ],
	[ TokenType.MultilineComment, commentMultiline ]
] )

export class Tokenizer {
	private source: string
	private location: Location = new Location()

	private state: TokenizerState = TokenizerState.Body
	private isTokenizing: boolean = true

	private tokens: Token[] = []

	constructor ( source: string ) {
		this.source = source
	}

	tokenize (): Token[] {
		while ( this.isTokenizing ) {
			const token: Token = this.getToken()
			this.updateState( token.type )

			this.tokens.push( token )

			this.location.forward( token.content )
			this.isTokenizing = this.location.offset < this.source.length
		}

		return this.tokens
	}

	getChar (): string {
		return this.source.substring(
			this.location.offset,
			// eslint-disable-next-line no-magic-numbers
			this.location.offset + 1
		)
	}

	test ( pattern: RegExp ): boolean {
		return pattern.test( this.source.substring( this.location.offset ) )
	}

	match ( pattern: RegExp ): RegExpMatchArray | null {
		const matches: RegExpMatchArray | null = this.source
			.substring( this.location.offset )
			.match( pattern )

		return matches
	}

	getToken (): Token {
		const tokenType: TokenType = this.getTokenType()

		let tokenValue: string = this.getChar()
		const tokenPattern: RegExp | undefined = TypePatternMap.get( tokenType )

		if ( tokenPattern ) {
			const match = this.match( tokenPattern )
			if ( match && match[ 0 ] ) [ tokenValue ] = match
		}

		const tokenEnd: Location = this.location.clone()
		tokenEnd.forward( tokenValue )

		return new Token(
			tokenType,
			tokenValue,
			new LocationSpan(
				this.location.clone(),
				tokenEnd
			)
		)
	}

	// eslint-disable-next-line complexity
	getTokenType (): TokenType {
		switch ( this.state ) {
			case TokenizerState.Body: {
				if ( this.test( tagBracketOpen ) ) return TokenType.TagBracketOpen
				if ( this.test( comment ) ) return TokenType.Comment
				if ( this.test( commentXml ) ) return TokenType.XmlComment
				if ( this.test( commentMultiline ) ) return TokenType.MultilineComment
				break
			}
			case TokenizerState.TagOpen: {
				if ( this.test( tagClosingSlash ) ) return TokenType.TagClosingSlash
				if ( this.test( tagBracketClose ) ) return TokenType.TagBracketClose
				if ( this.test( whitespace ) ) return TokenType.Whitespace
				if ( this.test( identifier ) ) return TokenType.TagIdentifier
				break
			}
			case TokenizerState.TagMiddle: {
				if ( this.test( tagClosingSlash ) ) return TokenType.TagSelfClosingSlash
				if ( this.test( whitespace ) ) return TokenType.Whitespace
				if ( this.test( identifier ) ) return TokenType.TagAttributeIdentifier
				break
			}
			case TokenizerState.TagClose: {
				if ( this.test( tagBracketClose ) ) return TokenType.TagBracketClose
				break
			}
			case TokenizerState.TagAttributeName: {
				if ( this.test( tagAttributeAssignment ) ) return TokenType.TagAttributeAssignment
				if ( this.test( whitespace ) ) return TokenType.Whitespace
				if ( this.test( identifier ) ) return TokenType.TagAttributeIdentifier
				break
			}
			case TokenizerState.TagAttributeAssignment: {
				if ( this.test( whitespace ) ) return TokenType.Whitespace

				// Literals
				if ( this.test( stringLiteral ) ) return TokenType.StringLiteral
				if ( this.test( numericLiteral ) ) return TokenType.NumberLiteral
				if ( this.test( booleanLiteral ) ) return TokenType.BooleanLiteral
				if ( this.test( nullLiteral ) ) return TokenType.NullLiteral
				break
			}
			case TokenizerState.TagAttributeValue: {
				if ( this.test( tagClosingSlash ) ) return TokenType.TagClosingSlash
				if ( this.test( tagBracketClose ) ) return TokenType.TagBracketClose
				if ( this.test( whitespace ) ) return TokenType.Whitespace

				// Literals
				if ( this.test( stringLiteral ) ) return TokenType.StringLiteral
				if ( this.test( numericLiteral ) ) return TokenType.NumberLiteral
				if ( this.test( booleanLiteral ) ) return TokenType.BooleanLiteral
				if ( this.test( nullLiteral ) ) return TokenType.NullLiteral
				break
			}
			default: { break }
		}

		return TokenType.Text
	}

	updateState ( lastType: TokenType ): void {
		const state = StateTypeMap.get( this.state )?.get( lastType )

		if ( state ) {
			console.log(
				`Received token type: ${ TokenType[ lastType ] }, `
				+ `\tTransitioning: ${ TokenizerState[ this.state ] } -> `
				+ `${ TokenizerState[ state ] }`
			)
			this.state = state
		}
	}
}
