// Whitespace and comments
export const whitespace = /\s+/v
export const lineBreak = /\r\n|\r|\n|\f/v
export const carriageReturn = /\r/v
export const lineFeed = /\n/v
export const comment = /\/\/(?<comment_content>.*)/v
export const commentMultiline = /\/\*(?<comment_content>.*)\*\//sv
export const commentXml = /<!--(?<comment_content>.*?)-->/sv

// Tags
export const startTagOpen = /<(?![!])/v
export const endTagOpen = /<\//v
export const tagClose = />/v
export const tagSelfClose = /\/>/v
export const equals = /^[=]/v

// Directives
export const directiveIndicator = /@/v
export const directiveIfIndicator = /@if/v
export const directiveElseIfIndicator = /@else if/v
export const directiveElseIndicator = /@else/v
export const directiveForeachIndicator = /@foreach/v
export const directiveContent = /(?:\((?<directive_content>.*)\))/v

// Identifiers and attributes
export const identifier = /[\p{L}\p{N}\-_]+/v
export const attributeValue = /"[^"]*"|'[^']*'/v

// Data types
export const string = /"(?:[^"\\]|\\.)*"/v
export const stringSemi = /'(?:[^'\\]|\\.)*'/v
export const number = /[\-]*\p{N}+(?:\.\p{N}+)?(?:[eE][+\-]?\p{N}+)?/v
export const boolean = /true|false/v
export const nullValue = /null/v

export const word = /[\p{L}\p{N}]/v
