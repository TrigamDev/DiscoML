import { LocationSpan } from "@disco/lang/location"

enum TokenType {
	OpeningTagStart, // <tagname
	OpeningTagEnd, // >
	ChildlessTagEnd, // />
	ClosingTag, // </tagname> // they have no attributes
	AttributeStart, // attributename=
	String, // "text here"
	CommentXmlStart, // <!--
	CommentXmlEnd, // -->
	DmlIndicator, // @
	CommentDmlStart, // /*
	CommentDmlEnd, // */
	CommentDmlSingle, // //
	If, // if
	ForEach, // foreach
	In, // in
	BracketOpen, // (
	BracketClose, // )
	BracketWaveOpen, // {
	BracketWaveClose, // }
	Identifier, //[a-zA-Z_][\w_]*
	evaluable, //anything between two normal brackets
}

class Token {
	readonly type: TokenType;
	readonly locationSpan: LocationSpan;
	readonly content: string | null;

	constructor(type: TokenType, locationSpan: LocationSpan, content?: string) {
		this.type = type;
		this.locationSpan = locationSpan;
		this.content = content ?? null;
	}
}

export { Token, TokenType };
