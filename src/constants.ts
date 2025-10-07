// Whitespace and comments
const whitespace = /\s+/v
const lineBreak = /\r\n|\r|\n|\f/v
const comment = /\/\/(?<comment_content>.*)/v
const commentMultiline = /\/\*(?<comment_content>.*)\*\//sv
const commentXml = /<!--(?<comment_content>.*?)-->/sv

// Tags
const startTagOpen = /<(?![!])/v
const endTagOpen = /<\//v
const tagClose = />/v
const tagSelfClose = /\/>/v
const equals = /[=]/v

// Directives
const directiveIndicator = /@/v
const directiveIfIndicator = /@if/v
const directiveElseIndicator = /@else/v
const directiveForeachIndicator = /@foreach/v
const directiveContent = /(?:\((?<directive_content>.*)\))/v

// Identifiers and attributes
const identifier = /[\p{L}\p{N}\-_]*/v
const attributeValue = /\"[^\"]*\"|'[^']*'/v

// Data types
const string = /"(?:[^"\\]|\\.)*"/v
const stringSemi = /'(?:[^'\\]|\\.)*'/v
const number = /[\-]*\p{N}+(?:\.\p{N}+)?(?:[eE][+\-]?\p{N}+)?/v
const boolean = /true|false/v
const nullValue = /null/v

const word = /[\p{L}\p{N}]/v


export {
	attributeValue,
	boolean,
	comment,
	commentMultiline,
	commentXml,
	directiveContent,
	directiveElseIndicator,
	directiveForeachIndicator,
	directiveIfIndicator,
	directiveIndicator,
	endTagOpen,
	equals,
	identifier,
	lineBreak,
	nullValue,
	number,
	startTagOpen,
	string,
	stringSemi,
	tagClose,
	tagSelfClose,
	whitespace,
	word
}
