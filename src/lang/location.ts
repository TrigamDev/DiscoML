import {
	carriageReturn, lineFeed
} from "@tokenizer/tokenTypes"

const startingLine = 1
const startingColumn = 1
const startingOffset = 0

export class Location {
	line: number
	column: number
	offset: number
	constructor (
		line: number = startingLine,
		column: number = startingColumn,
		offset: number = startingOffset
	) {
		this.line = line
		this.column = column
		this.offset = offset
	}

	forward ( str: string ): void {
		for ( const char of str ) {
			this.column++
			this.offset++

			if ( carriageReturn.test( char ) ) {
				this.column = startingColumn
			}
			if ( lineFeed.test( char ) ) {
				this.line++
			}
		}
	}

	clone (): Location {
		return new Location(
			this.line,
			this.column,
			this.offset
		)
	}

	toString (): string {
		return `Location(${ this.line }:${ this.column }, ${ this.offset })`
	}

	toJSON (): LocationObject {
		return {
			line: this.line,
			column: this.column,
			offset: this.offset
		}
	}
}
export interface LocationObject {
	line: number
	column: number
	offset: number
}

export class LocationSpan {
	start: Location
	end: Location
	constructor (
		start: Location = new Location(),
		end: Location = new Location()
	) {
		this.start = start.clone()
		this.end = end.clone()
	}

	snapToEnd (): void {
		this.start = this.end.clone()
	}

	forward ( str: string ): void {
		this.end.forward( str )
	}

	merge ( other: LocationSpan ): LocationSpan {
		const start = this.start.offset > other.start.offset ? this.start : other.start
		const end = this.end.offset > other.end.offset ? this.end : other.end

		return new LocationSpan( start.clone(), end.clone() )
	}

	clone (): LocationSpan {
		return new LocationSpan(
			this.start.clone(),
			this.end.clone()
		)
	}

	toString (): string {
		return "LocationSpan("
			+ `start=(${ this.start.line }:${ this.start.column }, ${ this.start.offset }), `
			+ `end=(${ this.end.line }:${ this.end.column }, ${ this.end.offset })`
			+ ")"
	}

	toJSON (): LocationSpanObject {
		return {
			start: this.start.toJSON(),
			end: this.end.toJSON()
		}
	}
}
export interface LocationSpanObject {
	start: LocationObject
	end: LocationObject
}
