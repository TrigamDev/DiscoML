import { Lexeme, LexemeType } from "./lexeme";

function lexemize(source: string): Lexeme[] {
	if (source.length == 0) {
		return [];
	}

	const lexemes: Lexeme[] = [];
	let current: Lexeme = Lexeme.fromChar(source[0]);

	for (let i = 1; i < source.length; i++) {
		const char = source[i];

		if (current.type == LexemeType.Special ||
			Lexeme.typeFromChar(char) != current.type
		) {
			lexemes.push(current);
			current = Lexeme.fromChar(char);
			continue;
		}

		current.content += char;
	}

	lexemes.push(current);
	return lexemes;
}

class LexemeStream {
	private lexemes: Lexeme[];
	private i = 0;

	constructor(source: string) {
		this.lexemes = lexemize(source);
	}

	hasNext(): boolean {
		return this.i < this.lexemes.length;
	}

	next(): Lexeme | null {
		if (!this.hasNext()) {
			return null;
		}

		return this.lexemes[this.i++];
	}

	drain(): Lexeme[] {
		const leftover = this.lexemes.slice(this.i);
		this.i = this.lexemes.length;
		return leftover;
	}
}

export { LexemeStream }
