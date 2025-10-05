export class XmlParseError extends Error {
	constructor(message?: string, options?: ErrorOptions) {
		super(message, options);
	}
}

export class DmlParseError extends Error {
	constructor(message?: string, options?: ErrorOptions) {
		super(message, options);
	}
}
