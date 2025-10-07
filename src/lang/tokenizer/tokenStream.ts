import { XmlParseError } from "@disco/error"
import {
	Lexeme, LexemeType
} from "@lexemizer/lexeme"
import { LexemeStream } from "@lexemizer/lexemeStream"
import {
	Token,
	TokenType
} from "@tokenizer/token"
import type { DiscoImport } from "@plugin/discoResolver"


export class TokenStream {
	private lexemes: LexemeStream
	private tokenBacklog: Token[] = []
	private sourcePath: string | null = null

	constructor ( input: string | DiscoImport ) {
		if ( ( input as DiscoImport )?.path ) {
			const sourceText: string = ( input as DiscoImport ).content
			this.lexemes = new LexemeStream( sourceText )
			this.sourcePath = ( input as DiscoImport ).path
		} else {
			const sourceText: string = input as string
			this.lexemes = new LexemeStream( sourceText )
		}
	}

	/*
		PairedContent is anything between two matching things,
		like brackets, wave brackets, xml/dml comments, etc.
	*/
	// eslint-disable-next-line no-unused-vars, class-methods-use-this
	getPairedContent ( end: string ): Token | null {
		/*
			TODO: consume all lexemes until `end` is hit
			TODO: figure out if `end` should be a string, regex, or Lexeme[]
			currently, the third option looks the most "sensible"?
		*/
		return null
	}

	// <
	handleGreaterThan ( first: Lexeme ): Token {
		let second = this.lexemes.next()

		// Comment
		if ( second?.content === "!" ) {
			const third = this.lexemes.next()
			const fourth = this.lexemes.next()

			if ( third?.content === "-" && fourth?.content === "-" ) {
				return new Token(
					TokenType.CommentXmlStart,
					first.locationSpan.between( fourth.locationSpan )
				)
			}

			/* TODO: more specific errors, as there are 4 cases here
			   where either of 3rd or 4th are either missing or wrong */
			throw new XmlParseError(
				`Expected "<!--" at ${ first.locationSpan.end } ${ third?.locationSpan.end }`
			)
		}

		// Closing tag
		if ( second?.content === "/" ) {
			const third = this.lexemes.nextNonWhitespace()
			const fourth = this.lexemes.nextNonWhitespace()

			if ( third?.type === LexemeType.Word && fourth?.content === ">" ) {
				return new Token(
					TokenType.ClosingTag,
					first.locationSpan.between( fourth.locationSpan ),
					third.content
				)
			}

			/* TODO: more specific errors, as there are 4 cases here
			   where either of 3rd or 4th are either missing or wrong */
			throw new XmlParseError(
				`Unknown symbol after "<" at ${ third?.locationSpan.end }`
			)
		}

		if ( second?.type === LexemeType.Whitespace ) {
			second = this.lexemes.nextNonWhitespace()
		}

		if ( second?.type === LexemeType.Word ) {
			return new Token(
				TokenType.OpeningTagStart,
				first.locationSpan.between( second.locationSpan ),
				second.content
			)
		}

		if ( second === null ) {
			throw new XmlParseError(
				`Expected a word after "<" at ${ first.locationSpan.end }`
			)
		}

		throw new XmlParseError(
			`Unallowed special character after "<" at ${ second.locationSpan.start }`
		)
	}

	// eslint-disable-next-line no-unused-vars, class-methods-use-this
	handleDmlIndicator ( first: Lexeme ): Token | null {
		/*
			TODO: if, foreach, single-line comments, multi-line comments
			TODO: nest and add to tokenBacklog
		*/
		return null
	}

	next (): Token | null {
		if ( this.tokenBacklog.length ) {
			// Stupid undefined to null conversion
			return this.tokenBacklog.shift() ?? null
		}

		const first = this.lexemes.nextNonWhitespace()
		switch ( first?.content ) {
			case "<": return this.handleGreaterThan( first )
			case "@": return this.handleDmlIndicator( first )
			default: return null
		}
	}
}
