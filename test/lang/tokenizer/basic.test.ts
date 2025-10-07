
import { TokenType } from "@disco/lang/tokenizer/token"
import { TokenStream } from "@disco/lang/tokenizer/tokenStream"
import basicComponent from "@test/lang/tokenizer/basic.dml"
import {
	expect, test
} from "bun:test"

test( "basic", () => {
	return // TODO: remove after im finished adding lexemizer tests
	const toknenizer = new TokenStream( basicComponent )
	const tokens = toknenizer.tokenize()

	console.log( basicComponent )

	expect( tokens ).toEqual( [
		{
			type: TokenType.Tag,

			name: "container",
			attributes: [],
			children: [
				{
					type: TokenType.Tag,

					name: "text",
					attributes: [],
					children: [
						{
							type: TokenType.Text,

							name: "",
							attributes: [],
							children: [],
							raw: "Hello world",

							location: {
								start: {
									position: 20,
									line: 2,
									column: 11
								},
								end: {
									position: 31,
									line: 2,
									column: 22
								}
							}
						}
					],
					raw: "<text>Hello world</text>",

					location: {
						start: {
							position: 14,
							line: 2,
							column: 5
						},
						end: {
							position: 38,
							line: 2,
							column: 29
						}
					}
				},
				{
					type: TokenType.Tag,

					name: "separator",
					attributes: [],
					children: [],
					raw: "<separator/>",

					location: {
						start: {
							position: 41,
							line: 3,
							column: 5
						},
						end: {
							position: 53,
							line: 3,
							column: 17
						}
					}
				}
			],
			raw: "<container>\n\t<text>Hello world</text>\n\t<separator/>\n</container>",

			location: {
				start: {
					position: 0,
					line: 1,
					column: 1
				},
				end: {
					position: 67,
					line: 4,
					column: 13
				}
			}
		},
		{
			type: TokenType.EndOfFile,

			name: "EOF",
			attributes: [],
			children: [],
			raw: "EOF",

			location: {
				start: {
					position: 67,
					line: 4,
					column: 13
				},
				end: {
					position: 67,
					line: 4,
					column: 13
				}
			}
		}
	] )
} )
