import { plugin } from "bun"

await plugin({
	name: "plugin-disco-resolver",
	setup ( build ) {
		build.onLoad({ filter: /\.dml$/ }, async ({ path }) => {
			const content = await ( Bun.file( path ) ).text()

			return {
				exports: {
					default: { content, path } as DiscoImport
				},
				loader: "object"
			}
		})
	}
})

export interface DiscoImport {
	content: string
	path: string
}