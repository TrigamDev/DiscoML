import { plugin, type BunPlugin } from "bun"

const componentResolver: BunPlugin = {
	name: "plugin-component-resolver",
	setup ( build ) {
		build.onLoad({ filter: /(?:\w)+\.component/ }, async ({ path }) => {
			const content = await ( Bun.file( path ) ).text()
			const exports: ComponentExport = {
				component: content,
				path
			}
			return {
				exports: {
					default: exports
				},
				loader: "object"
			}
		})
	}
}

plugin( componentResolver )

export interface ComponentExport {
	component: string
	path: string
}