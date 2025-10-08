import type { LocationSpan } from "@disco/lang/location"

/* eslint-disable no-unused-vars */
export enum TokenType {
	// Literals
	Text,
	Identifier,
	String,
	Number,
	Boolean,
	Null,

	// Tag Components
	TagBracketOpen,
	TagBracketClose,
	TagClosingSlash,
	TagAttributeEquals,

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
	XmlCommentStart,
	XmlCommentEnd,
	MultilineCommentStart,
	MultilineCommentEnd
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
}
