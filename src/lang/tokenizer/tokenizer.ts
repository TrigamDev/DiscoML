import { TokenType, type Token } from "@tokenizer/token"
import { whitespace, lineBreak, identifier, startTagOpen, tagSelfClose, tagClose, endTagOpen } from "@disco/constants"

import type { DiscoImport } from "@plugin/discoResolver"


export class Tokenizer {
	private input: string
	private tokens: Token[] = []

	// State
	private location: Location
	private sourcePath?: string

	constructor ( input: string | DiscoImport ) {
		// Get input string
		if ( ( input as DiscoImport )?.path ) {
			input = input as DiscoImport
			this.input = input.content
			this.sourcePath = input.path
		}
		else this.input = input as string

		// Location
		this.location = {
			position: 0,
			line: 1,
			column: 0
		}
	}

	/* -------------------------------------------------------------------------- */
	/*                                Tokenization                                */
	/* -------------------------------------------------------------------------- */
	public tokenize () {
		while ( this.location.position < this.input.length ) {
			this.consumeWhitespace()
			const char = this.getChar()

			if ( this.matchPattern( startTagOpen ) ) this.tokenizeTag()

			this.advance()
		}
		
		return this.tokens
	}


	private tokenizeTag (): void {
		const start = { ... this.location }
		let isSelfClosing = false

		let raw = ""

		// Skip opening
		if ( this.matchPattern( endTagOpen ) ) raw += this.consumePattern( endTagOpen )
		else raw += this.consumePattern( startTagOpen )

		let tagName = ""
		while ( this.location.position < this.input.length ) {
			const char = this.getChar()
			if ( !this.matchPattern( identifier ) ) break

			tagName += char
			raw += char
			this.advance()
		}

		// Skip closing
		if ( this.matchPattern( tagSelfClose ) ) {
			raw += this.consumePattern( tagSelfClose )
			isSelfClosing = true
		} else raw += this.consumePattern( tagClose )



		// Create tag token
		const tagToken: Token = {
			type: TokenType.Tag,

			name: tagName,
			attributes: [],
			children: [],
			raw,

			location: {
				start,
				end: { ... this.location }
			}
		}

		this.tokens.push( tagToken )
	}

	/* -------------------------------------------------------------------------- */
	/*                             Input manipulation                             */
	/* -------------------------------------------------------------------------- */
	private getChar ( peekAhead: number = 0 ): string {
		return this.input[ this.location.position + peekAhead ]
	}

	private matchChar ( target: string, peekAhead: number = 0 ): boolean {
		return this.getChar( peekAhead ) === target
	}

	private consumeWhitespace (): void {
		while ( whitespace.test( this.getChar() ) ) {
			this.advance()
		}
	}

	private matchPattern ( regexPattern: RegExp ): boolean {
		const inputLeft = this.input.slice( this.location.position )
		const match = regexPattern.exec( inputLeft )
		return match?.index === 0
	}

	private consumePattern ( regexPattern: RegExp ): string | null {
		const inputLeft = this.input.slice( this.location.position )
		const match = regexPattern.exec( inputLeft )
		if ( match?.index === 0 ) {
			this.advance( match[ 0 ].length )
			return match[ 0 ]
		} else return null
	}

	/* -------------------------------------------------------------------------- */
	/*                                  Location                                  */
	/* -------------------------------------------------------------------------- */
	private advance ( steps: number = 1 ): void {
		if ( lineBreak.test( this.getChar() ) ) {
			this.location.position += steps
			this.location.column = 0
			this.location.line++
		} else {
			// Move right
			this.location.position += steps
			this.location.column += steps
		}
	}
}

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

// Location
export interface Location {
	position: number

	line: number
	column: number
}