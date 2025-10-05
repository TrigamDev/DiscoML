import { Lexeme, LexemeType } from "@disco/lang/lexemizer/lexeme";
import { LexemeStream } from "@disco/lang/lexemizer/lexemeStream";
import { expect, test } from "bun:test";

test("new LexemeStream(string) diacritics", () => {
	const source = `<container>
	<text>Hallöchen Leute!</text>
	<separator/>
</container>`;

	const stream = new LexemeStream(source);

	const { Whitespace, Special, Word } = LexemeType;
	expect(stream.drain()).toEqual([new Lexeme(Special, "<", {
		start: { line: 1, column: 1, offset: 0 },
		end: { line: 1, column: 2, offset: 1 }
	}), new Lexeme(Word, "container", {
		start: { line: 1, column: 2, offset: 1 },
		end: { line: 1, column: 11, offset: 10 }
	}), new Lexeme(Special, ">", {
		start: { line: 1, column: 11, offset: 10 },
		end: { line: 1, column: 12, offset: 11 }
	}), new Lexeme(Whitespace, "\n\t", {
		start: { line: 1, column: 12, offset: 11 },
		end: { line: 2, column: 2, offset: 13 }
	}), new Lexeme(Special, "<", {
		start: { line: 2, column: 2, offset: 13 },
		end: { line: 2, column: 3, offset: 14 }
	}), new Lexeme(Word, "text", {
		start: { line: 2, column: 3, offset: 14 },
		end: { line: 2, column: 7, offset: 18 }
	}), new Lexeme(Special, ">", {
		start: { line: 2, column: 7, offset: 18 },
		end: { line: 2, column: 8, offset: 19 }
	}), new Lexeme(Word, "Hallöchen", {
		start: { line: 2, column: 8, offset: 19 },
		end: { line: 2, column: 17, offset: 28 }
	}), new Lexeme(Whitespace, " ", {
		start: { line: 2, column: 17, offset: 28 },
		end: { line: 2, column: 18, offset: 29 }
	}), new Lexeme(Word, "Leute", {
		start: { line: 2, column: 18, offset: 29 },
		end: { line: 2, column: 23, offset: 34 }
	}), new Lexeme(Special, "!", {
		start: { line: 2, column: 23, offset: 34 },
		end: { line: 2, column: 24, offset: 35 }
	}), new Lexeme(Special, "<", {
		start: { line: 2, column: 24, offset: 35 },
		end: { line: 2, column: 25, offset: 36 }
	}), new Lexeme(Special, "/", {
		start: { line: 2, column: 25, offset: 36 },
		end: { line: 2, column: 26, offset: 37 }
	}), new Lexeme(Word, "text", {
		start: { line: 2, column: 26, offset: 37 },
		end: { line: 2, column: 30, offset: 41 }
	}), new Lexeme(Special, ">", {
		start: { line: 2, column: 30, offset: 41 },
		end: { line: 2, column: 31, offset: 42 }
	}), new Lexeme(Whitespace, "\n\t", {
		start: { line: 2, column: 31, offset: 42 },
		end: { line: 3, column: 2, offset: 44 }
	}), new Lexeme(Special, "<", {
		start: { line: 3, column: 2, offset: 44 },
		end: { line: 3, column: 3, offset: 45 }
	}), new Lexeme(Word, "separator", {
		start: { line: 3, column: 3, offset: 45 },
		end: { line: 3, column: 12, offset: 54 }
	}), new Lexeme(Special, "/", {
		start: { line: 3, column: 12, offset: 54 },
		end: { line: 3, column: 13, offset: 55 }
	}), new Lexeme(Special, ">", {
		start: { line: 3, column: 13, offset: 55 },
		end: { line: 3, column: 14, offset: 56 }
	}), new Lexeme(Whitespace, "\n", {
		start: { line: 3, column: 14, offset: 56 },
		end: { line: 4, column: 1, offset: 57 }
	}), new Lexeme(Special, "<", {
		start: { line: 4, column: 1, offset: 57 },
		end: { line: 4, column: 2, offset: 58 }
	}), new Lexeme(Special, "/", {
		start: { line: 4, column: 2, offset: 58 },
		end: { line: 4, column: 3, offset: 59 }
	}), new Lexeme(Word, "container", {
		start: { line: 4, column: 3, offset: 59 },
		end: { line: 4, column: 12, offset: 68 }
	}), new Lexeme(Special, ">", {
		start: { line: 4, column: 12, offset: 68 },
		end: { line: 4, column: 13, offset: 69 }
	})]);
});
