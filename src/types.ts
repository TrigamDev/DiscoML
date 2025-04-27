export interface Node {
	name: string
	props: { name: string, value: string | number | boolean }[]
	children: (Node | string )[]
}