import type { Location } from "@tokenizer/tokenizer"

// Token
export enum TokenType {
	Tag = "tag", // Includes the start tag, end tag, and everything inbetween
	Attribute = "attribute",

	Expression = "expression",
	Directive = "directive",
	
	Text = "text",
	EndOfFile = "end_of_file"
}

export interface Token {
	type: TokenType

	name: string
	attributes: Attribute[]
	children: Token[]
	raw: string

	location: {
		start: Location,
		end: Location
	}
}

// Attributes
export enum AttributeType {
	String = "string",
	Number = "number",
	Boolean = "boolean"
}

export interface Attribute {
	type: AttributeType,

	name: string
	value: any

	location: {
		start: Location,
		end: Location
	}

	raw: string
}