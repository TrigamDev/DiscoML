import type { DiscoImport } from "@plugin/discoResolver"
import { endingTagOpen, lineBreak, tagClose, tagOpen, tagSelfClose, whitespace } from "@disco/constants"
import { TokenType, type Token } from "@tokenizer/token"

export class Tokenizer {
	private input: string
	private tokens: Token[] = []

	// State
	private location: Location
	private sourcePath?: string

	constructor ( input: string | DiscoImport ) {
		if ( ( input as DiscoImport )?.path ) {
			input = input as DiscoImport
			this.input = input.content
			this.sourcePath = input.path
		}
		else this.input = input as string

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
			const char = this.getChar()

			// Skip whitespace
			if ( whitespace.test( char ) ) {
				this.consumeWhitespace()
				continue
			}

			if ( tagOpen.test( char ) ) this.handleTag()
			else this.handleText()
		}

		this.tokens.push({
			type: TokenType.EndOfFile,

			name: "EOF",
			attributes: [],
			children: [],
			raw: "EOF",

			location: {
				start: { ... this.location },
				end: { ... this.location }
			}
		})
		
		return this.tokens
	}

	// Handle raw text
	private handleText (): void {
		const start = { ... this.location }
		let text = ""

		while ( this.location.position < this.input.length ) {
			const char = this.getChar()
			if ( tagOpen.test( char ) ) break

			text += char

			this.advance()
		}

		if ( text.length <= 0 ) return

		const token: Token = {
			type: TokenType.Text,

			name: "",
			attributes: [],
			children: [],
			raw: text,

			location: {
				start,
				end: { ... this.location }
			}
		}

		this.tokens.push( token )
	}

	// Handle tags
	private handleTag(): void {
		const start = { ... this.location }
		let isSelfClosing = false
		let isOpening = false
		let isEnding = false

		let raw = ""

		// Skip tag opening
		let endingTagOpenMatch = endingTagOpen.exec( this.input.slice( this.location.position ) )
		let tagOpenMatch = tagOpen.exec( this.input.slice( this.location.position ) )

		if ( endingTagOpenMatch?.index === 0 ) {
			console.log( endingTagOpenMatch )
			raw += endingTagOpenMatch[ 0 ]
			this.advance( endingTagOpenMatch[ 0 ].length )
		}
		else if ( tagOpenMatch?.index === 0 ) {
			console.log( tagOpenMatch )
			raw += tagOpenMatch[ 0 ]
			this.advance( tagOpenMatch[ 0 ].length )
		}

		// Get tag name
		let tagName = ""
		while ( this.location.position < this.input.length ) {
			const char = this.getChar()
			if ( whitespace.test( char ) || tagClose.test( char ) ) break

			tagName += char
			raw += char

			this.advance()
		}

		// Skip tag closing
		while ( true ) {
			const char = this.getChar()
			if ( !tagClose.test( char ) && !tagSelfClose.test( char ) ) break

			raw += char
			this.advance()
		}

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