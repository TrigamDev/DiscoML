import { DmlParseError } from "@disco/error"
import type { LocationSpan } from "../location"

type StringFunction = ()=> string
type NumberFunction = ()=> number
type BooleanFunction = ()=> boolean

type DmlNodeTag = string
type DmlNodeAttributes = Map<string,
	string | number | boolean
	| StringFunction | NumberFunction | BooleanFunction
>
type DmlNodeContent = string | ( ()=> string ) | DmlNode[] | null

class DmlNode {
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

abstract class MessageComponent {
	constructor ( node: DmlNode ) {
		// ...because you can't put a constructor in an interface...
		this.assignNode( node )
	}

	/* eslint-disable no-unused-vars */
	abstract assignNode ( node: DmlNode ): void // Should throw on failure
	abstract render ( componentData: object ): object
	/* eslint-enable no-unused-vars */
}

/**
 * <row>
 *    etc.
 * </row>
 */
class Row implements MessageComponent {
	private buttons: Select | Button[]
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <button url="https://example.com">Label</button>
 * exclusively or
 * <button style="primary" id="aaa">Label</button>
 * exclusively or
 * <button style="secondary|success|danger">Label</button>
 * all of them can have the `disabled` attribute too
 */
/* eslint-disable no-magic-numbers */
enum ButtonStyle {
	Primary = 1,
	Secondary = 2,
	Success = 3,
	Danger = 4,
	Link = 5
}
/* eslint-enable no-magic-numbers */

class Button implements MessageComponent {
	private style: ButtonStyle
	private url: string | null
	private id: string | null
	private label: string
	private disabled: boolean
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <text>Text Content</text>
 */
class Text implements MessageComponent {
	private content: string
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <section>
 *    etc.
 * </section>
 */
class Section implements MessageComponent {
	private text: Text[]
	private button: Button | null
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <select id="" placeholder="" min=2 max=3 disabled>
 *    etc.
 * </select>
 */
class Select implements MessageComponent {
	private options: Option[]
	private id: string
	private placeholder: string | null
	private min: number | null
	private max: number | null
	private disabled: boolean
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <option label="" default=true emoji="" description="">Value Data</option>
 */
class Option implements MessageComponent {
	private label: string
	private value: string
	private default: boolean
	private emoji: string | null
	private description: string | null
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <container color=0xff00ff spoiler>
 *     etc.
 * </container>
 */
class Container implements MessageComponent {
	private children: ( Text | Section | Row | File | MediaGallery | Separator )[]
	private color: number | null
	private spoiler: boolean
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <title url="https://example.com">Embed Title</title>
 */
class Title implements MessageComponent {
	private content: string
	private url: string | null
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <description>Embed Description</description>
 */
class Description implements MessageComponent {
	private content: string
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <image url="https://example.com/etc.png" isThumbnail=bool />
 */
class Image implements MessageComponent {
	private url: string
	private isThumbnail: boolean
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <author url="https://example.com" icon="https://example.com/etc.png">AuthorName</author>
 */
class Author implements MessageComponent {
	private name: string
	private icon: string | null
	private url: string | null
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <field name="string" inline>value text</field>
 */
class Field implements MessageComponent {
	private name: string
	private value: string
	private inline: boolean
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <footer icon="https://example.com/etc.png">footer text</footer>
 */
class Footer implements MessageComponent {
	private content: string
	private icon: string | null
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <timestamp date="DATE HERE" />
 * or
 * <timestamp />
 * for "now"
 */
class Timestamp implements MessageComponent {
	private date: Date | null
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <separator divider spacing="small" />
 * or
 * <separator spacing="large"/>
 */
enum SeparatorSpacing {
	Small,
	Large
}

class Separator implements MessageComponent {
	private spacing: SeparatorSpacing
	private divider: boolean
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <gallery>
 *    etc...
 * </gallery>
 */
class MediaGallery implements MessageComponent {
	private children: MediaGalleryItem[]
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <media url="" />
 * or
 * <media url="" alt="" spoiler />
 */
class MediaGalleryItem implements MessageComponent {
	private url: string
	private alt: string | null
	private spoiler: boolean
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

/**
 * <file url="" />
 */
class File implements MessageComponent {
	private url: string
	assignNode ( node: DmlNode ): void {

	}

	render ( componentData: object ): object {

	}
}

// TODO: make constructors and make them throw errors when shit goes wrong

// TODO: finally, render component

// TODO: Add DML directive support (with strict return types?)

// eslint-disable-next-line no-unused-vars
const TagNodeMap = new Map<string, new ( node: DmlNode )=> MessageComponent>( [
	[ "row", Row ],
	[ "button", Button ],
	[ "text", Text ],
	[ "section", Section ],
	[ "select", Select ],
	[ "option", Option ],
	[ "container", Container ],
	[ "title", Title ],
	[ "description", Description ],
	[ "image", Image ],
	[ "author", Author ],
	[ "field", Field ],
	[ "footer", Footer ],
	[ "timestamp", Timestamp ],
	[ "separator", Separator ],
	[ "gallery", MediaGallery ],
	[ "media", MediaGalleryItem ],
	[ "file", File ]
] )

function MessageComponentNodeFactory ( node: DmlNode ): MessageComponent {
	const Component = TagNodeMap.get( node.tag.toLowerCase() )

	if ( !Component ) {
		throw new Error( `Unknown Tag: ${ node.tag }` )
	}

	return new Component( node )
}

export {
	DmlNode, MessageComponentNodeFactory
}
