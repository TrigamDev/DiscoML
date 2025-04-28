import type { Snowflake } from "discord.js"

export const allowedNodes = [
	"container",
	"section",
	"separator",

	"text",

	"button",

	"link",
	"emoji"
]



export interface Node {
	name: string
	props: Property[]
	content?: any
}
export interface Property {
	name: string
	value: unknown
}

// #region Layout
export interface ContainerNode extends Node {
	name: "container"
	props: [
		{ name: "color", value: number | null },
		{ name: "spoiler", value: boolean }
	]
}

export interface SectionNode extends Node {
	name: "section",
	props: []
}

export interface SeparatorNode extends Node {
	name: "separator",
	props: [
		{ name: "spacing", value: "small" | "large" },
		{ name: "divider", value: boolean }
	],
	content?: never
}
// #endregion

// #region Content
export interface TextNode extends Node {
	name: "text",
	props: [],
	content: string
}
// #endregion

// #region Interactive
export interface ButtonNode extends Node {
	name: "button",
	props: [
		{ name: "id", value: string | null },
		{ name: "style", value: "primary" | "secondary" | "danger" | "link" },
		{ name: "disabled", value: boolean }
	],
	content: [ string, LinkNode?, EmojiNode? ]
}
// #endregion

// #region Formatting
export interface LinkNode extends Node {
	name: "text",
	props: [
		{ name: "to", value: URL }
	],
	content: string
}

export interface EmojiNode extends Node {
	name: "emoji",
	props: [
		{ name: "id", value: Snowflake }
	],
	content: string
}
// #endregion