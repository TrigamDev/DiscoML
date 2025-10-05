import type { LocationSpan } from "../location";

enum LexemeType {
	Whitespace,
	Special,
	Word
}

const whitespaces = /\s/,

	// https://stackoverflow.com/a/30225759, because \w does not include diacritics
	wordChars = /[\wÀ-ÖØ-öø-įĴ-őŔ-žǍ-ǰǴ-ǵǸ-țȞ-ȟȤ-ȳɃɆ-ɏḀ-ẞƀ-ƓƗ-ƚƝ-ơƤ-ƥƫ-ưƲ-ƶẠ-ỿ]/;

class Lexeme {
	readonly type: LexemeType;
	content: string;
	readonly locationSpan: LocationSpan;

	constructor(type: LexemeType, char: string, location: LocationSpan) {
		this.type = type;
		this.content = char;
		this.locationSpan = structuredClone(location);
	}

	static typeFromChar(char: string): LexemeType {
		if (whitespaces.test(char)) {
			return LexemeType.Whitespace;
		}

		if (wordChars.test(char)) {
			return LexemeType.Word;
		}

		return LexemeType.Special;
	}

	static fromChar(char: string, location: LocationSpan): Lexeme {
		return new Lexeme(this.typeFromChar(char), char, location);
	}
}

export { LexemeType, Lexeme };
