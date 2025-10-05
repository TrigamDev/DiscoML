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

export type { Location, LocationSpan };
export { StartLocation as EmptyLocation, StartLocationSpan };
