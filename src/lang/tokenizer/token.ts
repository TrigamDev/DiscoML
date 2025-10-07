/*
	eslint-disable
	no-unused-vars
*/

import { LocationSpan } from "@disco/lang/location"

export enum TokenType {
	OpeningTagStart, // <tagname
	OpeningTagEnd, // >
	ChildlessTagEnd, // />
	ClosingTag, // </tagname> // they have no attributes
	AttributeStart, // Attributename=
	String, // "text here"
	CommentXmlStart, // <!--
	CommentXmlEnd, // -->
	DmlIndicator, // @
	CommentDmlStart, // /*
	CommentDmlEnd, // */
	CommentDmlSingle, // //
	If, // If
	Else, // Else
	ForEach, // Foreach
	In, // In
	BracketOpen, // (
	BracketClose, // )
	BracketWaveOpen, // {
	BracketWaveClose, // }
	Identifier, // [a-zA-Z_][\w_]*
	PairContent // Anything between two pairs of anything
}

export class Token {
	readonly type: TokenType
	readonly locationSpan: LocationSpan
	readonly content: string | null

	constructor (
		type: TokenType,
		locationSpan: LocationSpan,
		content?: string
	) {
		this.type = type
		this.locationSpan = locationSpan
		this.content = content ?? null
	}
}
