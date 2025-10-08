import { Location } from "@disco/lang/location"
import {
	type Token,
	TokenType
} from "@tokenizer/token"
import {
	tagBracketClose, tagBracketOpen,
	TagClosingSlash
} from "@tokenizer/tokenPatterns"

enum TokenizerState {
	Body,
	Tag
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
			const char: string = this.getChar()
			const tokenType: TokenType = this.getTokenType()
			this.updateState( tokenType )

			console.log( `${ char }: ${ TokenType[ tokenType ] }` )

			this.location.forward( char )
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
			case TokenizerState.Tag: {
				if ( this.test( TagClosingSlash ) ) return TokenType.TagClosingSlash
				if ( this.test( tagBracketClose ) ) return TokenType.TagBracketClose
				break
			}
			default: { break }
		}

		return TokenType.Text
	}

	updateState ( lastType: TokenType ): void {
		switch ( this.state ) {
			/*
			   Tokenizer state: Body
			*/
			case TokenizerState.Body: {
				switch ( lastType ) {
					case TokenType.TagBracketOpen: {
						this.state = TokenizerState.Tag
						break
					}
					default: { break }
				}
				break
			}

			/*
			   Tokenizer state: Tag
			*/
			case TokenizerState.Tag: {
				switch ( lastType ) {
					case TokenType.TagBracketClose: {
						this.state = TokenizerState.Body
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
