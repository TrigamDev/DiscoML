export const whitespace = /^\s+/v

export const identifier = /^[\p{L}\p{N}\-_]+/v

export const tagBracketOpen = /^<(?![!])/v
export const tagBracketClose = /^>/v
export const tagClosingSlash = /^\//v

export const tagAttributeAssignment = /^[=]/v
