import {
	Location, LocationSpan
} from "@disco/lang/location"
import {
	Token,
	TokenType
} from "@tokenizer/token"
import {
	booleanLiteral,
	comment,
	commentMultiline,
	commentXml,
	identifier,
	nullLiteral,
	numericLiteral,
	stringLiteral,
	tagAttributeAssignment,
	tagBracketClose, tagBracketOpen,
	tagClosingSlash,
	whitespace
} from "@tokenizer/tokenPatterns"
import chalk from "chalk"

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
		let tokenPattern: RegExp | null = null
		switch ( tokenType ) {
			case TokenType.TagIdentifier:
			case TokenType.TagAttributeIdentifier: {
				tokenPattern = identifier
				break
			}
			case TokenType.StringLiteral: {
				tokenPattern = stringLiteral
				break
			}
			case TokenType.NumberLiteral: {
				tokenPattern = numericLiteral
				break
			}
			case TokenType.BooleanLiteral: {
				tokenPattern = booleanLiteral
				break
			}
			case TokenType.NullLiteral: {
				tokenPattern = nullLiteral
				break
			}
			case TokenType.Whitespace: {
				tokenPattern = whitespace
				break
			}
			case TokenType.Comment: {
				tokenPattern = comment
				break
			}
			case TokenType.XmlComment: {
				tokenPattern = commentXml
				break
			}
			case TokenType.MultilineComment: {
				tokenPattern = commentMultiline
				break
			}
			default: { break }
		}

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
		switch ( this.state ) {
			case TokenizerState.Body: {
				switch ( lastType ) {
					case TokenType.TagBracketOpen: {
						this.state = TokenizerState.TagOpen
						break
					}
					default: { break }
				}
				break
			}
			case TokenizerState.TagOpen: {
				switch ( lastType ) {
					case TokenType.TagBracketClose: {
						this.state = TokenizerState.Body
						break
					}
					case TokenType.Whitespace: {
						this.state = TokenizerState.TagMiddle
						break
					}
					default: { break }
				}
				break
			}
			case TokenizerState.TagMiddle: {
				switch ( lastType ) {
					case TokenType.TagBracketClose:
					case TokenType.TagSelfClosingSlash: {
						this.state = TokenizerState.TagClose
						break
					}
					case TokenType.TagAttributeIdentifier: {
						this.state = TokenizerState.TagAttributeName
						break
					}
					default: { break }
				}
				break
			}
			case TokenizerState.TagClose: {
				switch ( lastType ) {
					case TokenType.TagBracketClose: {
						this.state = TokenizerState.Body
						break
					}
					default: { break }
				}
				break
			}
			case TokenizerState.TagAttributeName: {
				switch ( lastType ) {
					case TokenType.TagAttributeAssignment: {
						this.state = TokenizerState.TagAttributeAssignment
						break
					}
					default: { break }
				}
				break
			}
			case TokenizerState.TagAttributeAssignment: {
				switch ( lastType ) {
					case TokenType.StringLiteral:
					case TokenType.NumberLiteral:
					case TokenType.BooleanLiteral:
					case TokenType.NullLiteral: {
						this.state = TokenizerState.TagAttributeValue
						break
					}
					default: { break }
				}
				break
			}
			case TokenizerState.TagAttributeValue: {
				switch ( lastType ) {
					case TokenType.TagBracketClose: {
						this.state = TokenizerState.Body
						break
					}
					case TokenType.TagSelfClosingSlash: {
						this.state = TokenizerState.TagClose
						break
					}
					case TokenType.Whitespace: {
						this.state = TokenizerState.TagMiddle
						break
					}
					default: { break }
				}
				break
			}


			default: { break }
		}
	}
}
