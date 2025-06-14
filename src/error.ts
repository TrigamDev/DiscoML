export class DiscoError extends Error {

	constructor ( message: string, location: Location ) {
		super( message )
	}

}

export class ParseError extends DiscoError {

}