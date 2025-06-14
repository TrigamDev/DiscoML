import { plugin, type BunPlugin } from "bun"

const discoResolver: BunPlugin = {
	name: "plugin-disco-resolver",
	setup ( build ) {
		build.onLoad({ filter: /(?:\w)+\.dml/ }, async ({ path }) => {
			const content = await ( Bun.file( path ) ).text()
			const exports: DiscoImport = {
				content: content,
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

plugin( discoResolver )

export interface DiscoImport {
	content: string
	path: string
}