enum LexemeType {
	Whitespace = "Whitespace",
	Special = "Special",
	Word = "Word"
}

const whitespaces = /\s/,

	// https://stackoverflow.com/a/30225759, because \w does not include diacritics
	wordChars = /[\wÀ-ÖØ-öø-įĴ-őŔ-žǍ-ǰǴ-ǵǸ-țȞ-ȟȤ-ȳɃɆ-ɏḀ-ẞƀ-ƓƗ-ƚƝ-ơƤ-ƥƫ-ưƲ-ƶẠ-ỿ]/;

class Lexeme {
	readonly type: LexemeType;
	content: string;

	constructor(type: LexemeType, char = "") {
		this.type = type;
		this.content = char;
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

	static fromChar(char: string): Lexeme {
		return new Lexeme(this.typeFromChar(char), char);
	}
}

export { LexemeType, Lexeme };
