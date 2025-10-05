import { Lexeme, LexemeType } from "./lexeme";
import { LocationSpan } from "../location";

function lexemize(source: string): Lexeme[] {
	if (source.length == 0) {
		return [];
	}

	let locationSpan: LocationSpan = new LocationSpan();
	const lexemes: Lexeme[] = [];

	locationSpan.forward(source[0]);

	let current: Lexeme = Lexeme.fromChar(source[0], locationSpan);

	for (let i = 1; i < source.length; i++) {
		const char = source[i];

		if (current.type == LexemeType.Special ||
			Lexeme.typeFromChar(char) != current.type
		) {
			lexemes.push(current);
			locationSpan = structuredClone(current.locationSpan);
			locationSpan.snapToEnd();
			current = Lexeme.fromChar(char, locationSpan);
			current.locationSpan.forward(char);
			continue;
		}

		current.locationSpan.forward(char);
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

	nextNonWhitespace(): Lexeme | null {
		let current = this.next();
		while (current?.type == LexemeType.Whitespace) {
			current = this.next();
		}

		return current;
	}

	drain(): Lexeme[] {
		const leftover = this.lexemes.slice(this.i);
		this.i = this.lexemes.length;
		return leftover;
	}
}

export { LexemeStream }
