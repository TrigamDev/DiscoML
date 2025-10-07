import { lineBreak } from "@disco/constants";

class Location {
	line: number
	column: number
	offset: number
	constructor(line = 1, column = 1, offset = 0) {
		this.line = line;
		this.column = column;
		this.offset = offset;
	}

	clone() {
		return structuredClone(this);
	}

	toString() {
		return `line ${this.line}, column ${this.column}`;
	}
}

class LocationSpan {
	start: Location
	end: Location
	constructor(start = new Location(), end = new Location()) {
		this.start = start;
		this.end = end;
	}

	clone() {
		return structuredClone(this);
	}

	snapToEnd() {
		this.end = this.start.clone();
	}

	forward(char: string) {
		this.end.column++;
		this.end.offset++;

		if (lineBreak.test(char)) {
			this.end.column = 1;
			this.end.line++;
		}
	}

	between(other: LocationSpan): LocationSpan {
		const start = this.start.offset > other.start.offset ? this.start : other.start;
		const end = this.end.offset > other.end.offset ? this.end : other.end;

		return new LocationSpan(start.clone(), end.clone());
	}
};

export { Location, LocationSpan };
