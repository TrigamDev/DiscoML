import type { LocationSpan } from "@disco/lang/location"

/* eslint-disable no-unused-vars */
export enum TokenType {
	// General
	Whitespace,
	Text,

	// Literals
	Identifier,
	StringLiteral,
	NumberLiteral,
	BooleanLiteral,
	NullLiteral,

	// Tag Components
	TagBracketOpen,
	TagBracketClose,
	TagClosingSlash,
	TagSelfClosingSlash,
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
}
