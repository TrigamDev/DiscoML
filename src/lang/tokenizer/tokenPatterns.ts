export const whitespace = /^\s+/v

export const stringLiteral = /"(?:[^"\\]|\\.)*"/v

export const tagBracketOpen = /^<(?![!])/v
export const tagBracketClose = /^>/v
export const tagClosingSlash = /^\//v
export const identifier = /^[\p{L}\p{N}\-_]+/v
export const tagAttributeAssignment = /^[=]/v

export const comment = /^\/\/(?<comment_content>.*)/v
export const commentMultiline = /^\/\*(?<comment_content>.*)\*\//sv
export const commentXml = /^<!--(?<comment_content>.*?)-->/sv
