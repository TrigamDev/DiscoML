type DmlNodeTag = string
type DmlNodeAttributes = Map<string, string | ( ()=> string )>
type DmlNodeContent = string | ( ()=> string ) | DmlNode[] | null

class DmlNode {
	tag: DmlNodeTag
	attributes: DmlNodeAttributes
	content: DmlNodeContent
	constructor ( tag: DmlNodeTag, attributes: DmlNodeAttributes, content: DmlNodeContent ) {
		this.tag = tag
		this.attributes = attributes
		this.content = content
	}
}

interface MessageComponent {
	// eslint-disable-next-line no-unused-vars
	render( componentData: object ): object
}

/**
 * <row>
 *    etc.
 * </row>
 */
class Row implements MessageComponent {
	private buttons: Select | Button[]
	render ( componentData: object ): object {
		return componentData ?? this
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
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <text>Text Content</text>
 */
class Text implements MessageComponent {
	private content: string
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <section color="#RRGGBB" spoiler>
 *    etc.
 * </section>
 */
class Section implements MessageComponent {
	private children: ( Text | Section | Row | File | MediaGallery | Separator )[]
	private color: number | null
	private spoiler: boolean
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <select id="" placeholder="" min=2 max=3>
 *    etc.
 * </select>
 */
class Select implements MessageComponent {
	private options: Option[]
	private id: string
	private placeholder: string | null
	private min: number | null
	private max: number | null
	render ( componentData: object ): object {
		return componentData ?? this
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
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <container color=0xff00ff>
 *     etc.
 * </container>
 */
class Container implements MessageComponent {
	private text: Text[]
	private button: Button | null
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <title url="https://example.com">Embed Title</title>
 */
class Title implements MessageComponent {
	private content: string
	private url: string | null
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <description>Embed Description</description>
 */
class Description implements MessageComponent {
	private content: string
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <image url="https://example.com/etc.png" isThumbnail=bool />
 */
class Image implements MessageComponent {
	private url: string
	private isThumbnail: boolean
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <author url="https://example.com" icon="https://example.com/etc.png">AuthorName</author>
 */
class Author implements MessageComponent {
	private name: string
	private icon: string | null
	private url: string | null
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <field name="string" inline>value text</field>
 */
class Field implements MessageComponent {
	private name: string
	private value: string
	private inline: boolean
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <footer icon="https://example.com/etc.png">footer text</footer>
 */
class Footer implements MessageComponent {
	private content: string
	private icon: string | null
	render ( componentData: object ): object {
		return componentData ?? this
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
	render ( componentData: object ): object {
		return componentData ?? this
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
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <gallery>
 *    etc...
 * </gallery>
 */
class MediaGallery implements MessageComponent {
	private children: MediaGalleryItem[]
	render ( componentData: object ): object {
		return componentData ?? this
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
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <file url="" />
 */
class File implements MessageComponent {
	private url: string
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

// TODO: instance fields for the classes

// TODO: make constructors and make them throw errors when shit goes wrong

// TODO: finally, render component

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
