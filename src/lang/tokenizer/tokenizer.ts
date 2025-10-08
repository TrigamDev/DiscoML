import {
	Location, LocationSpan
} from "@disco/lang/location"
import {
	Token,
	TokenType
} from "@tokenizer/token"
import {
	comment,
	commentMultiline,
	commentXml,
	identifier,
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
		let colored = ""
		while ( this.isTokenizing ) {
			const char: string = this.getChar()

			const token: Token = this.getToken()
			this.updateState( token.type )

			// Color the chars for easy debugging
			switch ( token.type ) {
				case TokenType.TagBracketOpen: {
					colored += chalk.gray( token.content )
					break
				}
				case TokenType.TagBracketClose: {
					colored += chalk.gray( token.content )
					break
				}
				case TokenType.TagClosingSlash: {
					colored += chalk.gray( token.content )
					break
				}
				case TokenType.TagSelfClosingSlash: {
					colored += chalk.red( token.content )
					break
				}
				case TokenType.TagAttributeAssignment: {
					colored += chalk.green( token.content )
					break
				}
				case TokenType.StringLiteral: {
					colored += chalk.yellow( token.content )
					break
				}
				case TokenType.Identifier: {
					colored += chalk.blue( token.content )
					break
				}
				case TokenType.TagAttributeIdentifier: {
					colored += chalk.cyan( token.content )
					break
				}
				case TokenType.Whitespace: {
					colored += chalk.bgGray( token.content )
					break
				}
				case TokenType.Text: {
					colored += chalk.white( token.content )
					break
				}
				case TokenType.Comment:
				case TokenType.XmlComment:
				case TokenType.MultilineComment: {
					colored += chalk.green( token.content )
					break
				}
				default: {
					colored += chalk.gray( token.content )
					break
				}
			}

			this.location.forward( token.content )
			this.isTokenizing = this.location.offset < this.source.length
		}
		console.log( colored )

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
		switch ( tokenType ) {
			case TokenType.Comment: {
				const match = this.match( comment )
				if ( match && match[ 0 ] ) [ tokenValue ] = match
				break
			}
			case TokenType.XmlComment: {
				const match = this.match( commentXml )
				if ( match && match[ 0 ] ) [ tokenValue ] = match
				break
			}
			case TokenType.MultilineComment: {
				const match = this.match( commentMultiline )
				if ( match && match[ 0 ] ) [ tokenValue ] = match
				break
			}
			default: { break }
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
				if ( this.test( identifier ) ) return TokenType.Identifier
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

				return TokenType.StringLiteral
			}
			case TokenizerState.TagAttributeValue: {
				if ( this.test( tagClosingSlash ) ) return TokenType.TagClosingSlash
				if ( this.test( tagBracketClose ) ) return TokenType.TagBracketClose
				if ( this.test( whitespace ) ) return TokenType.Whitespace

				// TODO: Literal types
				if ( this.test( identifier ) ) return TokenType.StringLiteral
				break
			}
			default: { break }
		}

		return TokenType.Text
	}

	updateState ( lastType: TokenType ): void {
		switch ( this.state ) {
			/*
			   Body
			*/
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

			/*
			   Tag Open
			*/
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

			/*
			   Tag Middle
			*/
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

			/*
			   Tag Close
			*/
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

			/*
			   Tag attribute name
			*/
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

			/*
			   Tag attribute assignment
			*/
			case TokenizerState.TagAttributeAssignment: {
				switch ( lastType ) {
					case TokenType.StringLiteral: {
						this.state = TokenizerState.TagAttributeValue
						break
					}
					default: { break }
				}
				break
			}

			/*
			   Tag attribute value
			*/
			case TokenizerState.TagAttributeValue: {
				switch ( lastType ) {
					case TokenType.TagBracketClose:
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
