import { TokenType } from "@tokenizer/tokenTypes"
import chalk from "chalk"
import type {
	LocationSpan, LocationSpanObject
} from "@disco/lang/location"

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

		switch ( this.type ) {
			case TokenType.TagBracketOpen:
			case TokenType.TagBracketClose:
			case TokenType.TagClosingSlash: {
				colorized = chalk.gray( this.content )
				break
			}
			case TokenType.TagSelfClosingSlash: {
				colorized = chalk.red( this.content )
				break
			}
			case TokenType.TagIdentifier: {
				colorized = chalk.blue( this.content )
				break
			}
			case TokenType.TagAttributeIdentifier: {
				colorized = chalk.cyan( this.content )
				break
			}
			case TokenType.TagAttributeAssignment: {
				colorized = chalk.gray( this.content )
				break
			}
			case TokenType.StringLiteral: {
				colorized = chalk.yellow( this.content )
				break
			}
			case TokenType.NumberLiteral: {
				colorized = chalk.green( this.content )
				break
			}
			case TokenType.BooleanLiteral: {
				colorized = chalk.magenta( this.content )
				break
			}
			case TokenType.NullLiteral: {
				colorized = chalk.red( this.content )
				break
			}
			case TokenType.Whitespace: {
				colorized = chalk.bgGray( this.content )
				break
			}
			case TokenType.Text: {
				colorized = chalk.white( this.content )
				break
			}
			case TokenType.Comment:
			case TokenType.XmlComment:
			case TokenType.MultilineComment: {
				colorized = chalk.green( this.content )
				break
			}
			default: { break }
		}

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
