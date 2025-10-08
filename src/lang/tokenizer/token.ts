import type {
	LocationSpan, LocationSpanObject
} from "@disco/lang/location"

/* eslint-disable no-unused-vars */
export enum TokenType {
	// General
	Whitespace,
	Text,

	// Literals
	StringLiteral,
	NumberLiteral,
	BooleanLiteral,
	NullLiteral,

	// Tag Components
	TagBracketOpen,
	TagBracketClose,
	TagClosingSlash,
	TagSelfClosingSlash,
	TagIdentifier,
	TagAttributeIdentifier,
	TagAttributeAssignment,

	// Directives
	DirectiveIndicator,
	IfDirective,
	ElseIfDirective,
	ElseDirective,
	ForEachDirective,
	ParenthesesOpen,
	ParenthesesClose,
	CurlyBraceOpen,
	CurlyBraceClose,

	// Comments
	Comment,
	XmlComment,
	MultilineComment
}

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
