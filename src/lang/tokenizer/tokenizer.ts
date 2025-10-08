import { Location } from "@disco/lang/location"
import {
	type Token,
	TokenType
} from "@tokenizer/token"
import {
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
			const tokenType: TokenType = this.getTokenType()
			this.updateState( tokenType )

			// Color the chars for easy debugging
			switch ( tokenType ) {
				case TokenType.TagBracketOpen: {
					colored += chalk.gray( char )
					break
				}
				case TokenType.TagBracketClose: {
					colored += chalk.gray( char )
					break
				}
				case TokenType.TagClosingSlash: {
					colored += chalk.gray( char )
					break
				}
				case TokenType.TagSelfClosingSlash: {
					colored += chalk.red( char )
					break
				}
				case TokenType.TagAttributeAssignment: {
					colored += chalk.green( char )
					break
				}
				case TokenType.StringLiteral: {
					colored += chalk.yellow( char )
					break
				}
				case TokenType.Identifier: {
					colored += chalk.blue( char )
					break
				}
				case TokenType.TagAttributeIdentifier: {
					colored += chalk.cyan( char )
					break
				}
				case TokenType.Whitespace: {
					colored += chalk.bgGray( char )
					break
				}
				case TokenType.Text: {
					colored += chalk.white( char )
					break
				}
				default: {
					colored += chalk.black( char )
					break
				}
			}

			this.location.forward( char )
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

	match ( pattern: RegExp ): string | null {
		const matches: RegExpMatchArray | null = this.source
			.substring( this.location.offset )
			.match( pattern )

		if ( matches === null ) return null

		return matches[ 0 ]
	}

	getTokenType (): TokenType {
		switch ( this.state ) {
			case TokenizerState.Body: {
				if ( this.test( tagBracketOpen ) ) return TokenType.TagBracketOpen
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
