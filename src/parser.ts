import type { Node } from "./types"

export class Parser {

	private data: string

	constructor ( data: string ) {
		this.data = data
	}

	public parse () {
		this.minify()
		console.log( this.data )

		// TODO: Evaluate expressions

		// TODO: Parse tags
	}

	private minify () {
		this.data = this.data.trim()
		this.data = this.data.replace( /<!--[\s\S]*?-->/g, "" ) // Remove comments
		this.data = this.data.replace( /[\n\r\t]/g, "" ) // Remove tabs and line breaks
	}

}