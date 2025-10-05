import { Lexeme, LexemeType } from "@disco/lang/lexemizer/lexeme";
import { LexemeStream } from "@disco/lang/lexemizer/lexemeStream";
import { expect, test } from "bun:test"

test("new LexemeStream(string) diacritics", () => {
	const source = `<container>
	<text>Hallöchen Leute!</text>
	<separator/>
</container>`;

	const stream = new LexemeStream(source);

	expect(stream.drain()).toEqual([
		new Lexeme(LexemeType.Special, "<"),
		new Lexeme(LexemeType.Word, "container"),
		new Lexeme(LexemeType.Special, ">"),
		new Lexeme(LexemeType.Whitespace, "\n	"),
		new Lexeme(LexemeType.Special, "<"),
		new Lexeme(LexemeType.Word, "text"),
		new Lexeme(LexemeType.Special, ">"),
		new Lexeme(LexemeType.Word, "Hallöchen"), // DIACRITIC.
		new Lexeme(LexemeType.Whitespace, " "),
		new Lexeme(LexemeType.Word, "Leute"),
		new Lexeme(LexemeType.Special, "!"),
		new Lexeme(LexemeType.Special, "<"),
		new Lexeme(LexemeType.Special, "/"),
		new Lexeme(LexemeType.Word, "text"),
		new Lexeme(LexemeType.Special, ">"),
		new Lexeme(LexemeType.Whitespace, "\n	"),
		new Lexeme(LexemeType.Special, "<"),
		new Lexeme(LexemeType.Word, "separator"),
		new Lexeme(LexemeType.Special, "/"),
		new Lexeme(LexemeType.Special, ">"),
		new Lexeme(LexemeType.Whitespace, "\n"),
		new Lexeme(LexemeType.Special, "<"),
		new Lexeme(LexemeType.Special, "/"),
		new Lexeme(LexemeType.Word, "container"),
		new Lexeme(LexemeType.Special, ">"),
	]);
});
