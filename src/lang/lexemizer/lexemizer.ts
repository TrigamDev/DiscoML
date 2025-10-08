import { LocationSpan } from "@disco/lang/location"
import {
	Lexeme, LexemeType
} from "@lexemizer/lexeme"

function startSpanFromLexeme ( lexeme: Lexeme ): LocationSpan {
	const span: LocationSpan = lexeme.span.clone()
	span.snapToEnd()

	return span
}

export class Lexemizer {
	private source: string
	private lexemes: Lexeme[] = []
	private span: LocationSpan = new LocationSpan()

	constructor ( source: string ) {
		this.source = source
	}

	lexemize (): Lexeme[] {
		if ( this.source.length === 0 ) return []

		let lastLexeme: Lexeme = new Lexeme()

		for ( const char of this.source ) {
			const currentLexemeSpan: LocationSpan = startSpanFromLexeme( lastLexeme )
			const currentLexeme: Lexeme = Lexeme.fromChar( char, currentLexemeSpan )
			currentLexeme.span.forward( char )

			const isDifferentType = currentLexeme.type !== lastLexeme.type
			const isSingleCharLexeme = [
				LexemeType.Special
			].includes( currentLexeme.type )

			if ( isDifferentType || isSingleCharLexeme ) {
				if ( lastLexeme.type !== LexemeType.Unknown ) {
					this.lexemes.push( lastLexeme )
				}
				lastLexeme = currentLexeme
			} else {
				lastLexeme.content += char
				lastLexeme.span.forward( char )
			}
		}

		this.lexemes.push( lastLexeme )

		return this.lexemes
	}
}
