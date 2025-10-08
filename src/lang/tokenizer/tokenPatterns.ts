// Whitespace
export const whitespace = /^\s+/v
export const carriageReturn = /^\r/v
export const lineFeed = /^\n/v

// Literals
export const stringLiteral = /^"(?:[^"\\]|\\.)*"/v
export const numericLiteral = /^[\-]*\p{N}+(?:\.\p{N}+)?(?:[eE][+\-]?\p{N}+)?/v
export const booleanLiteral = /^true|false/v
export const nullLiteral = /^null/v

// Tag components
export const tagBracketOpen = /^<(?![!])/v
export const tagBracketClose = /^>/v
export const tagClosingSlash = /^\//v
export const identifier = /^[\p{L}\p{N}\-_]+/v
export const tagAttributeAssignment = /^[=]/v

// Directives
export const directiveIndicator = /^@/v
export const ifDirectiveIndicator = /^if/v
export const elseIfDirectiveIndicator = /^else if/v
export const elseDirectiveIndicator = /^else/v
export const forEachDirectiveIndicator = /^for each/v
export const directiveContent = /^(?:\((?<directive_content>.*)\))/v

// Comments
export const comment = /^\/\/(?<comment_content>.*)/v
export const commentMultiline = /^\/\*(?<comment_content>.*)\*\//sv
export const commentXml = /^<!--(?<comment_content>.*?)-->/sv
