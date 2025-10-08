import {
	Lexeme, LexemeType
} from "@lexemizer/lexeme"
import { Lexemizer } from "@lexemizer/lexemizer"

export class LexemeStream {
	private lexemes: Lexeme[]
	private lexemeIndex = 0

	constructor ( source: string ) {
		const lexemizer = new Lexemizer( source )
		this.lexemes = lexemizer.lexemize()
	}

	hasNext (): boolean {
		return this.lexemeIndex < this.lexemes.length
	}

	next (): Lexeme | null {
		if ( !this.hasNext() ) {
			return null
		}

		return this.lexemes[ this.lexemeIndex++ ]
	}

	nextNonWhitespace (): Lexeme | null {
		let current = this.next()
		while ( current?.type === LexemeType.Whitespace ) {
			current = this.next()
		}

		return current
	}

	drain (): Lexeme[] {
		const leftover = this.lexemes.slice( this.lexemeIndex )
		this.lexemeIndex = this.lexemes.length

		return leftover
	}
}
