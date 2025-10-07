// Whitespace and comments
export const whitespace = new RegExp("[\\s\\r\\n\\t\\f]+")
export const lineBreak = new RegExp("(\\r\\n|\\r|\\n|\\f)")
export const comment = new RegExp("//.*")
export const commentMultiStart = new RegExp("/\\*", "gs")
export const commentMultiEnd = new RegExp("\\*/", "gs")
export const commentMultiXmlStart = new RegExp("<!--", "gs")
export const commentMultiXmlEnd = new RegExp("-->", "gs")

// Tags
export const startTagOpen = new RegExp("<(?![!])")
export const endTagOpen = new RegExp("</")
export const tagClose = new RegExp(">")
export const tagSelfClose = new RegExp("/>")
export const equals = new RegExp("=")

// Interpolation
export const interpolationOpen = new RegExp("{{")
export const interpolationClose = new RegExp("}}")

// Directives
export const directiveIndicator = new RegExp("@")
export const directiveIf = new RegExp("@if\\s*\\((.*?)\\)")
export const directiveForeach = new RegExp("@foreach\\s*\\((.*?)\\)")
export const directiveElse = new RegExp("@else")

// Identifiers and attributes
export const identifier = new RegExp("^[\\w_][\\w\\d\\-_.]*")
export const attributeName = new RegExp("^[\\w_:][\\w\\d\\-_:]*")
export const attributeValue = new RegExp("\"[^\"]*\"|'[^']*'")

// Data types
export const string = new RegExp("\"[^\"]*\"")
export const stringSemi = new RegExp("'[^']*'")
export const number = new RegExp("\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b")
export const boolean = new RegExp("true|false|True|False")
export const nullValue = new RegExp("null|Null")
