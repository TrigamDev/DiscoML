import type { ComponentExport } from "../plugin/componentResolver"
import type { Node } from "./nodes"
import { whitespace } from "./regex"

export class Parser {

	private input: string

	// State
	private location: Location
	private sourcePath?: string

	constructor ( input: string | ComponentExport ) {
		// If input is a component file
		if ( ( input as ComponentExport )?.path ) {
			input = input as ComponentExport
			this.input = input.component
			this.sourcePath = input.path
		}
		else this.input = input as string

		this.location = {
			position: 0,
			line: 1,
			column: 0
		}
	}

	public parse () {
		this.consumeWhitespace()
		console.log( this.input )
		//throw this.error( SyntaxError, "bruh!" )

		// TODO: Evaluate expressions

		// TODO: Parse tags
	}

	// Input manipulation
	private getChar (): string {
		return this.input[ this.location.position ]
	}
	private matchChar ( target: string ): boolean {
		return this.getChar() === target
	}

	private consumeWhitespace (): void {
		while ( whitespace.test( this.getChar() ) ) {
			// If whitespace is a linebreak, go to next line
			if ( this.matchChar( "\n" ) ) {
				this.location.line++
				this.location.column = 0
			}
			else this.location.column++

			this.location.position++
		}
	}

}

export interface Location {
	position: number
	line: number
	column: number
}