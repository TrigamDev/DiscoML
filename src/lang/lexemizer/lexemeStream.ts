import { Lexeme, LexemeType } from "./lexeme";
import type { LocationSpan } from "../location";
import { StartLocationSpan } from "../location";

function forward(locationSpan: LocationSpan, char: string) {
	locationSpan.end.column++;
	locationSpan.end.offset++;

	if (char == '\n') {
		locationSpan.end.column = 1;
		locationSpan.end.line++;
	}

}

function lexemize(source: string): Lexeme[] {
	if (source.length == 0) {
		return [];
	}

	let locationSpan: LocationSpan = StartLocationSpan();
	const lexemes: Lexeme[] = [];

	forward(locationSpan, source[0]);

	let current: Lexeme = Lexeme.fromChar(source[0], locationSpan);

	for (let i = 1; i < source.length; i++) {
		const char = source[i];

		if (current.type == LexemeType.Special ||
			Lexeme.typeFromChar(char) != current.type
		) {
			lexemes.push(current);
			locationSpan = structuredClone(current.locationSpan);
			locationSpan.start = structuredClone(locationSpan.end);
			current = Lexeme.fromChar(char, locationSpan);

			forward(current.locationSpan, char);
			continue;
		}

		forward(current.locationSpan, char);
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
