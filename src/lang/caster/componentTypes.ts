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
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <button url="https://example.com">Label</button>
 * exclusively or
 * <button style="primary" id="aaa">Label</button>
 * exclusively or
 * <button style="secondary|success|danger" onclick=@( expression )>Label</button>
 * all of them can have the `disabled` attribute too
 */
class Button implements MessageComponent {
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <text>Text Content</text>
 */
class Text implements MessageComponent {
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <section>
 *    etc.
 * </section>
 */
class Section implements MessageComponent {
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <select id="" placeholder="" min=2 max=3>
 *    etc.
 * </select>
 *
 * <select placeholder="" min=2 max=3 onclick=@( expression )>
 */
class Select implements MessageComponent {
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <option label="" default=true emoji="" description="">Value Data</option>
 */
class Option implements MessageComponent {
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
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <title url="https://example.com">Embed Title</title>
 */
class Title implements MessageComponent {
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <description>Embed Description</description>
 */
class Description implements MessageComponent {
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <image url="https://example.com/etc.png" isThumbnail=bool />
 */
class Image implements MessageComponent {
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <author url="https://example.com" icon="https://example.com/etc.png">AuthorName</author>
 */
class Author implements MessageComponent {
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <field name="string" inline=bool>value text</field>
 */
class Field implements MessageComponent {
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <footer icon="https://example.com/etc.png">footer text</footer>
 */
class Footer implements MessageComponent {
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
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <separator divider spacing="small" />
 * or
 * <separator spacing="large"/>
 */
class Separator implements MessageComponent {
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
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

/**
 * <file url="" />
 */
class File implements MessageComponent {
	render ( componentData: object ): object {
		return componentData ?? this
	}
}

// TODO: make constructors and make them throw errors when shit goes wrong

// TODO: instance fields for the classes

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
