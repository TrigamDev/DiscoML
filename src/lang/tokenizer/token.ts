import type { Location } from "@disco/lang/location"
import type { LocationSpan } from "../location"
import { string } from "@disco/constants"

// Token
export enum TokenType {
	Tag = "tag",
	Attribute = "attribute",

	Expression = "expression",
	Directive = "directive",
	
	Text = "text",
	EndOfFile = "end_of_file"
}

export class Token {
	readonly type: TokenType
	readonly raw: string
	readonly location: LocationSpan

	constructor ( type: TokenType, raw: string, location: LocationSpan ) {
		this.type = type
		this.raw = raw
		this.location = location
	}
}

export class TagToken extends Token {
	name: string
	attributes: Attribute[]
	children: Token[]

	constructor (
		name: string,
		attributes: Attribute[],
		children: Token[],
		raw: string,
		location: LocationSpan
	) {
		super ( TokenType.Tag, raw, location )
		this.name = name
		this.attributes = attributes
		this.children = children
	}
}

export class TextToken extends Token {
	content: string

	constructor ( content: string, raw: string, location: LocationSpan ) {
		super ( TokenType.Text, raw, location )
		this.content = content
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