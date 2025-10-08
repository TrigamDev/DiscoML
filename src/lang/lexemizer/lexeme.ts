/*
	eslint-disable
	no-unused-vars
*/

import {
	identifier, whitespace
} from "@disco/constants"
import {
	LocationSpan, type LocationSpanObject
} from "@disco/lang/location"

export enum LexemeType {
	Unknown = "unknown",
	Whitespace = "whitespace",
	Special = "special",
	Word = "word"
}

export class Lexeme {
	readonly type: LexemeType
	content: string
	readonly span: LocationSpan

	constructor (
		type: LexemeType = LexemeType.Unknown,
		char: string = "",
		span: LocationSpan = new LocationSpan()
	) {
		this.type = type
		this.content = char
		this.span = span.clone()
	}

	static typeFromChar ( char: string ): LexemeType {
		if ( whitespace.test( char ) ) {
			return LexemeType.Whitespace
		}

		if ( identifier.test( char ) ) {
			return LexemeType.Word
		}

		return LexemeType.Special
	}

	static fromChar ( char: string, span: LocationSpan ): Lexeme {
		return new Lexeme( this.typeFromChar( char ), char, span.clone() )
	}

	toString (): string {
		return "Lexeme("
			+ `type=${ this.type },`
			+ `content="${ this.content }", `
			+ `span=${ this.span }`
			+ ")"
	}

	toJSON (): LexemeObject {
		return {
			type: this.type,
			content: this.content,
			span: this.span.toJSON()
		}
	}
}
export interface LexemeObject {
	type: LexemeType
	content: string
	span: LocationSpanObject
}
