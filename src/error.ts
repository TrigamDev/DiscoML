// Rename once lib name is decided upon
export class CustomError extends Error {

	constructor ( message: string, location: Location ) {
		super( message )
	}

}

export class ParseError extends CustomError {

}