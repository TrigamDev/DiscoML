import { TokenType, Token } from "@tokenizer/token";
import { whitespace, lineBreak, identifier, startTagOpen, tagSelfClose, tagClose, endTagOpen, comment, commentMultiline, directiveIndicator, directiveIf, directiveElse, directiveForeach, interpolationOpen } from "@disco/constants";

import type { DiscoImport } from "@plugin/discoResolver";
import { LocationSpan } from "@disco/lang/location";
import { LexemeStream } from "../lexemizer/lexemeStream";
import { Lexeme, LexemeType } from "../lexemizer/lexeme";
import { XmlParseError } from "@disco/error";


export class TokenStream {
	private lexemes: LexemeStream;
	private tokenBacklog: Token[] = [];

	private location = new LocationSpan;
	private sourcePath?: string

	constructor(input: string | DiscoImport) {
		if ((input as DiscoImport)?.path) {
			input = input as DiscoImport;
			this.lexemes = new LexemeStream(input.content);
			this.sourcePath = input.path;
		} else {
			this.lexemes = new LexemeStream(input as string);
		}
	}

	// <
	handleGreaterThan(first: Lexeme): Token {
		let second = this.lexemes.next();

		// comment
		if (second?.content == "!") {
			const third = this.lexemes.next(),
				fourth = this.lexemes.next();

			if (third?.content == "-" && fourth?.content == "-") {
				return new Token(TokenType.CommentXmlStart, first.locationSpan.between(fourth.locationSpan));
			}

			// TODO: more specific errors, as there are 4 cases here
			// where either of 3rd or 4th are either missing or wrong
			throw new XmlParseError(`Expected "<!--" at ${first.locationSpan.end} ${third?.locationSpan.end}`);
		}

		// closing tag
		if (second?.content == "/") {
			const third = this.lexemes.nextNonWhitespace(),
				fourth = this.lexemes.nextNonWhitespace();

			if (third?.type == LexemeType.Word && fourth?.content == ">") {
				return new Token(TokenType.ClosingTag, first.locationSpan.between(fourth.locationSpan), third.content);
			}

			// TODO: more specific errors, as there are 4 cases here
			// where either of 3rd or 4th are either missing or wrong
			throw new XmlParseError(`Unknown symbol after "<" at ${third?.locationSpan.end}`);
		}

		if (second?.type == LexemeType.Whitespace) {
			second = this.lexemes.nextNonWhitespace();
		}

		if (second?.type == LexemeType.Word) {
			return new Token(TokenType.OpeningTagStart, first.locationSpan.between(second.locationSpan), second.content);
		}

		if (second == null) {
			throw new XmlParseError(`Expected a word after "<" at ${first.locationSpan.end}`);
		}

		throw new XmlParseError(`Unallowed special character after "<" at ${second.locationSpan.start}`);
	}

	handleDmlIndicator(first: Lexeme): Token {
		// TODO: if, foreach, single-line comments, multi-line comments
		// TODO: nest and add to tokenBacklog
	}

	next(): Token | null {
		if (this.tokenBacklog.length) {
			return this.tokenBacklog.shift() ?? null; // stupid undefined to null conversion
		}

		const first = this.lexemes.nextNonWhitespace();
		switch (first?.content) {
			case "<":
				return this.handleGreaterThan(first);
			case "@":
				return this.handleDmlIndicator(first);
		}
	}
}
