import { lineBreak } from "@disco/constants"

const startingLine = 1
const startingColumn = 1
const startingOffset = 0

class Location {
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

	clone (): Location {
		return structuredClone( this )
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
interface LocationObject {
	line: number
	column: number
	offset: number
}

class LocationSpan {
	start: Location
	end: Location
	constructor (
		start: Location = new Location(),
		end: Location = new Location()
	) {
		this.start = start
		this.end = end
	}

	clone (): LocationSpan {
		return structuredClone( this )
	}

	snapToEnd (): void {
		this.end = this.start.clone()
	}

	forward ( char: string ): void {
		this.end.column++
		this.end.offset++

		if ( lineBreak.test( char ) ) {
			this.end.column = 1
			this.end.line++
		}
	}

	between ( other: LocationSpan ): LocationSpan {
		const start = this.start.offset > other.start.offset ? this.start : other.start
		const end = this.end.offset > other.end.offset ? this.end : other.end

		return new LocationSpan( start.clone(), end.clone() )
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
interface LocationSpanObject {
	start: LocationObject
	end: LocationObject
}

export {
	Location, LocationSpan
}
