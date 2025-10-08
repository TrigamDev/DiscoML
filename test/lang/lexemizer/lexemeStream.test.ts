/* eslint-disable no-magic-numbers */
import {
	Lexeme, LexemeType
} from "@disco/lang/lexemizer/lexeme"
import { LexemeStream } from "@disco/lang/lexemizer/lexemeStream"
import {
	Location, LocationSpan
} from "@disco/lang/location"
import { getDiscoSource } from "@disco/util"
import diacriticsComponent from "@test/components/basic_diacritics.dml"
import {
	expect, test
} from "bun:test"

test( "new LexemeStream(string) diacritics", () => {
	const sourceText: string = getDiscoSource( diacriticsComponent )
	const stream = new LexemeStream( sourceText )

	expect(
		stream.drain()
	).toEqual(
		[
			new Lexeme(
				LexemeType.Special,
				"<",
				new LocationSpan(
					new Location( 1, 1, 0 ),
					new Location( 1, 2, 1 )
				)
			),
			new Lexeme(
				LexemeType.Word,
				"container",
				new LocationSpan(
					new Location( 1, 2, 1 ),
					new Location( 1, 11, 10 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				">",
				new LocationSpan(
					new Location( 1, 11, 10 ),
					new Location( 1, 12, 11 )
				)
			),
			new Lexeme(
				LexemeType.Whitespace,
				"\n\t",
				new LocationSpan(
					new Location( 1, 12, 11 ),
					new Location( 2, 2, 13 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				"<",
				new LocationSpan(
					new Location( 2, 2, 13 ),
					new Location( 2, 3, 14 )
				)
			),
			new Lexeme(
				LexemeType.Word,
				"text",
				new LocationSpan(
					new Location( 2, 3, 14 ),
					new Location( 2, 7, 18 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				">",
				new LocationSpan(
					new Location( 2, 7, 18 ),
					new Location( 2, 8, 19 )
				)
			),
			new Lexeme(
				LexemeType.Word,
				"Hallöchen",
				new LocationSpan(
					new Location( 2, 8, 19 ),
					new Location( 2, 17, 28 )
				)
			),
			new Lexeme(
				LexemeType.Whitespace,
				" ",
				new LocationSpan(
					new Location( 2, 17, 28 ),
					new Location( 2, 18, 29 )
				)
			),
			new Lexeme(
				LexemeType.Word,
				"Leute",
				new LocationSpan(
					new Location( 2, 18, 29 ),
					new Location( 2, 23, 34 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				"!",
				new LocationSpan(
					new Location( 2, 23, 34 ),
					new Location( 2, 24, 35 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				"<",
				new LocationSpan(
					new Location( 2, 24, 35 ),
					new Location( 2, 25, 36 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				"/",
				new LocationSpan(
					new Location( 2, 25, 36 ),
					new Location( 2, 26, 37 )
				)
			),
			new Lexeme(
				LexemeType.Word,
				"text",
				new LocationSpan(
					new Location( 2, 26, 37 ),
					new Location( 2, 30, 41 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				">",
				new LocationSpan(
					new Location( 2, 30, 41 ),
					new Location( 2, 31, 42 )
				)
			),
			new Lexeme(
				LexemeType.Whitespace,
				"\n\t",
				new LocationSpan(
					new Location( 2, 31, 42 ),
					new Location( 3, 2, 44 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				"<",
				new LocationSpan(
					new Location( 3, 2, 44 ),
					new Location( 3, 3, 45 )
				)
			),
			new Lexeme(
				LexemeType.Word,
				"separator",
				new LocationSpan(
					new Location( 3, 3, 45 ),
					new Location( 3, 12, 54 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				"/",
				new LocationSpan(
					new Location( 3, 12, 54 ),
					new Location( 3, 13, 55 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				">",
				new LocationSpan(
					new Location( 3, 13, 55 ),
					new Location( 3, 14, 56 )
				)
			),
			new Lexeme(
				LexemeType.Whitespace,
				"\n",
				new LocationSpan(
					new Location( 3, 14, 56 ),
					new Location( 4, 1, 57 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				"<",
				new LocationSpan(
					new Location( 4, 1, 57 ),
					new Location( 4, 2, 58 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				"/",
				new LocationSpan(
					new Location( 4, 2, 58 ),
					new Location( 4, 3, 59 )
				)
			),
			new Lexeme(
				LexemeType.Word,
				"container",
				new LocationSpan(
					new Location( 4, 3, 59 ),
					new Location( 4, 12, 68 )
				)
			),
			new Lexeme(
				LexemeType.Special,
				">",
				new LocationSpan(
					new Location( 4, 12, 68 ),
					new Location( 4, 13, 69 )
				)
			)
		]
	)
} )
