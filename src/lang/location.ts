import { lineBreak } from "@disco/constants";

type Location = {
	line: number,
	column: number,
	offset: number
}

type LocationSpan = {
	start: Location,
	end: Location
};

function StartLocation(): Location {
	return {
		line: 1,
		column: 1,
		offset: 0
	};
}

function StartLocationSpan(): LocationSpan {
	return {
		start: StartLocation(),
		end: StartLocation()
	};
}

function forward(locationSpan: LocationSpan, char: string) {
	locationSpan.end.column++;
	locationSpan.end.offset++;

	if (lineBreak.test(char)) {
		locationSpan.end.column = 1;
		locationSpan.end.line++;
	}

}

export type { Location, LocationSpan };
export { StartLocation, StartLocationSpan, forward };
