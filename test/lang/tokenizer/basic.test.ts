/* eslint-disable no-magic-numbers */
import {
	Location, LocationSpan
} from "@disco/lang/location"
import {
	Token
} from "@disco/lang/tokenizer/token"
import { Tokenizer } from "@disco/lang/tokenizer/tokenizer"
import {
	TokenType
} from "@disco/lang/tokenizer/tokenTypes"
import { getDiscoSource } from "@disco/util"
import basicComponent from "@test/components/basic.dml"
import {
	expect, test
} from "bun:test"

test( "Basic tokenization", () => {
	const sourceText: string = getDiscoSource( basicComponent )
	const tokenizer: Tokenizer = new Tokenizer( sourceText )
	const tokens = tokenizer.drain()

	console.log( tokens.map( ( token ) => token.toString() ).join( "" ) )

	expect( tokens )
		.toEqual(
			[
				new Token(
					TokenType.TagBracketOpen,
					"<",
					new LocationSpan(
						new Location( 1, 1, 0 ),
						new Location( 1, 2, 1 )
					)
				),
				new Token(
					TokenType.TagIdentifier,
					"container",
					new LocationSpan(
						new Location( 1, 2, 1 ),
						new Location( 1, 11, 10 )
					)
				),
				new Token(
					TokenType.TagBracketClose,
					">",
					new LocationSpan(
						new Location( 1, 11, 10 ),
						new Location( 1, 12, 11 )
					)
				),
				new Token(
					TokenType.Text,
					"\r\n\t",
					new LocationSpan(
						new Location( 1, 12, 11 ),
						new Location( 2, 2, 14 )
					)
				),
				new Token(
					TokenType.TagBracketOpen,
					"<",
					new LocationSpan(
						new Location( 2, 2, 14 ),
						new Location( 2, 3, 15 )
					)
				),
				new Token(
					TokenType.TagIdentifier,
					"text",
					new LocationSpan(
						new Location( 2, 3, 15 ),
						new Location( 2, 7, 19 )
					)
				),
				new Token(
					TokenType.TagBracketClose,
					">",
					new LocationSpan(
						new Location( 2, 7, 19 ),
						new Location( 2, 8, 20 )
					)
				),
				new Token(
					TokenType.Text,
					"Hello world",
					new LocationSpan(
						new Location( 2, 8, 20 ),
						new Location( 2, 19, 31 )
					)
				),
				new Token(
					TokenType.TagBracketOpen,
					"<",
					new LocationSpan(
						new Location( 2, 19, 31 ),
						new Location( 2, 20, 32 )
					)
				),
				new Token(
					TokenType.TagClosingSlash,
					"/",
					new LocationSpan(
						new Location( 2, 20, 32 ),
						new Location( 2, 21, 33 )
					)
				),
				new Token(
					TokenType.TagIdentifier,
					"text",
					new LocationSpan(
						new Location( 2, 21, 33 ),
						new Location( 2, 25, 37 )
					)
				),
				new Token(
					TokenType.TagBracketClose,
					">",
					new LocationSpan(
						new Location( 2, 25, 37 ),
						new Location( 2, 26, 38 )
					)
				),
				new Token(
					TokenType.Text,
					"\r\n\t",
					new LocationSpan(
						new Location( 2, 26, 38 ),
						new Location( 3, 3, 42 )
					)
				),
				new Token(
					TokenType.TagBracketOpen,
					"<",
					new LocationSpan(
						new Location( 3, 2, 41 ),
						new Location( 3, 3, 42 )
					)
				),
				new Token(
					TokenType.TagIdentifier,
					"separator",
					new LocationSpan(
						new Location( 3, 3, 42 ),
						new Location( 3, 12, 51 )
					)
				),
				new Token(
					TokenType.TagClosingSlash,
					"/",
					new LocationSpan(
						new Location( 3, 12, 51 ),
						new Location( 3, 13, 52 )
					)
				),
				new Token(
					TokenType.TagBracketClose,
					">",
					new LocationSpan(
						new Location( 3, 13, 52 ),
						new Location( 3, 14, 53 )
					)
				),
				new Token(
					TokenType.Text,
					"\r\n",
					new LocationSpan(
						new Location( 3, 14, 53 ),
						new Location( 4, 1, 55 )
					)
				),
				new Token(
					TokenType.TagBracketOpen,
					"<",
					new LocationSpan(
						new Location( 4, 1, 55 ),
						new Location( 4, 2, 56 )
					)
				),
				new Token(
					TokenType.TagClosingSlash,
					"/",
					new LocationSpan(
						new Location( 4, 2, 56 ),
						new Location( 4, 3, 57 )
					)
				),
				new Token(
					TokenType.TagIdentifier,
					"container",
					new LocationSpan(
						new Location( 4, 3, 57 ),
						new Location( 4, 12, 66 )
					)
				),
				new Token(
					TokenType.TagBracketClose,
					">",
					new LocationSpan(
						new Location( 4, 12, 66 ),
						new Location( 4, 13, 67 )
					)
				)
			]
		)
} )
