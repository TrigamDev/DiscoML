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
	DirectiveIdentifier,
	DirectiveContent,
	ParenthesesOpen,
	ParenthesesClose,
	CurlyBraceOpen,
	CurlyBraceClose,

	// Comments
	Comment,
	XmlComment,
	MultilineComment
}

// General
export const identifier = /^[\p{L}\p{N}\-_]+/v

// Whitespace
export const whitespace = /^\s+/v
export const carriageReturn = /^\r/v
export const lineFeed = /^\n/v

// Literals
export const stringLiteral = /^"(?:[^"\\]|\\.)*"/v
export const numberLiteral = /^[\-]*\p{N}+(?:\.\p{N}+)?(?:[eE][+\-]?\p{N}+)?/v
export const booleanLiteral = /^true|false/v
export const nullLiteral = /^null/v

// Tag components
export const tagBracketOpen = /^<(?![!])/v
export const tagBracketClose = /^>/v
export const tagClosingSlash = /^\//v
export const tagAttributeAssignment = /^[=]/v

// Directives
export const directiveIndicator = /^@/v
export const directiveContent = /^(?:\((?<directive_content>.*)\))/v
export const parenthesesOpen = /^\(/v
export const parenthesesClose = /^\)/v
export const curlyBraceOpen = /^\{/v
export const curlyBraceClose = /^\}/v

// Comments
export const comment = /^\/\/(?<comment_content>.*)/v
export const commentMultiline = /^\/\*(?<comment_content>.*)\*\//sv
export const commentXml = /^<!--(?<comment_content>.*?)-->/sv
