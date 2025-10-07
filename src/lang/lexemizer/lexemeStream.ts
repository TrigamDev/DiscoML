import { LocationSpan } from "@disco/lang/location"
import {
	Lexeme, LexemeType
} from "@lexemizer/lexeme"

function lexemize ( source: string ): Lexeme[] {
	if ( source.length === 0 ) return []

	let locationSpan: LocationSpan = new LocationSpan()
	const lexemes: Lexeme[] = []

	locationSpan.forward( source[ 0 ] )

	let current: Lexeme = Lexeme.fromChar( source[ 0 ], locationSpan )

	for ( let charIndex = 1; charIndex < source.length; charIndex++ ) {
		const char = source[ charIndex ]

		if ( current.type === LexemeType.Special
			|| Lexeme.typeFromChar( char ) !== current.type
		) {
			lexemes.push( current )
			locationSpan = current.locationSpan.clone()
			locationSpan.snapToEnd()
			current = Lexeme.fromChar( char, locationSpan )
			current.locationSpan.forward( char )
			continue
		}

		current.locationSpan.forward( char )
		current.content += char
	}

	lexemes.push( current )

	return lexemes
}

export class LexemeStream {
	private lexemes: Lexeme[]
	private lexemeIndex = 0

	constructor ( source: string ) {
		this.lexemes = lexemize( source )
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
