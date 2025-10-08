import { TokenType } from "@tokenizer/tokenTypes"
import chalk, { type ChalkInstance } from "chalk"
import type {
	LocationSpan, LocationSpanObject
} from "@disco/lang/location"

const TypeColorMap: Map<TokenType, ChalkInstance> = new Map( [
	// General
	[ TokenType.Whitespace, chalk.bgGray ],
	[ TokenType.Text, chalk.white ],

	// Literals
	[ TokenType.StringLiteral, chalk.yellow ],
	[ TokenType.NumberLiteral, chalk.green ],
	[ TokenType.BooleanLiteral, chalk.magenta ],
	[ TokenType.NullLiteral, chalk.red ],

	// Tag Components
	[ TokenType.TagBracketOpen, chalk.gray ],
	[ TokenType.TagBracketClose, chalk.gray ],
	[ TokenType.TagClosingSlash, chalk.gray ],
	[ TokenType.TagIdentifier, chalk.blue ],
	[ TokenType.TagAttributeIdentifier, chalk.cyan ],
	[ TokenType.TagAttributeAssignment, chalk.gray ],

	// Directives
	[ TokenType.DirectiveIndicator, chalk.red ],
	[ TokenType.DirectiveIdentifier, chalk.magenta ],
	[ TokenType.DirectiveContent, chalk.greenBright ],
	[ TokenType.CurlyBraceOpen, chalk.gray ],
	[ TokenType.CurlyBraceClose, chalk.gray ],
	[ TokenType.CurlyBraceOpen, chalk.gray ],
	[ TokenType.CurlyBraceClose, chalk.gray ],

	// Comments
	[ TokenType.Comment, chalk.green ],
	[ TokenType.XmlComment, chalk.green ],
	[ TokenType.MultilineComment, chalk.green ]
] )

export class Token {
	readonly type: TokenType
	readonly content: string
	readonly span: LocationSpan

	constructor (
		type: TokenType,
		content: string,
		span: LocationSpan
	) {
		this.type = type
		this.content = content
		this.span = span
	}

	// Just for debugging purposes, remove later
	toString (): string {
		let colorized: string = chalk.gray( this.content )

		const colorer = TypeColorMap.get( this.type )
		if ( colorer ) colorized = colorer( this.content )

		return colorized
	}

	toJSON (): TokenObject {
		return {
			type: this.type,
			content: this.content,
			span: this.span.toJSON()
		}
	}
}
export interface TokenObject {
	type: TokenType
	content: string
	span: LocationSpanObject
}
