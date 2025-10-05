type Location = {
	line: number,
	column: number,
	offset: number
}

type LocationSpan = {
	start: Location,
	end: Location
};

export type { Location, LocationSpan };
