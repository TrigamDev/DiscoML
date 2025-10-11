import { DmlParseError } from "@disco/error"
import type { LocationSpan } from "../location"

type StringFunction = ()=> string
type NumberFunction = ()=> number
type BooleanFunction = ()=> boolean
type DmlNodeArrayFunction = ()=> DmlNode[]

type DmlNodeTag = string
type DmlNodeAttributes = Map<string,
	string | number | boolean
	| StringFunction | NumberFunction | BooleanFunction
>
type DmlNodeContent = string | DmlNode[] | StringFunction | DmlNodeArrayFunction | null

export class DmlNode {
	tag: DmlNodeTag
	attributes: DmlNodeAttributes
	content: DmlNodeContent
	span: LocationSpan

	constructor (
		tag: DmlNodeTag,
		attributes: DmlNodeAttributes,
		content: DmlNodeContent,
		span: LocationSpan
	) {
		this.tag = tag
		this.attributes = attributes
		this.content = content
		this.span = span
	}

	/* TODO: validate value type?
	   ROADBLOCK: how to do this in TS? */
	assertAttributes ( required: string[] ) {
		const missing = required.filter( ( key ) => !this.attributes.has( key ) )

		if ( !missing.length ) {
			return
		}

		const { start } = this.span
		throw new DmlParseError(
			`<${ this.tag }> element at ${ start } requires the tags: ${ missing.join( ", " ) }`
		)
	}
}
