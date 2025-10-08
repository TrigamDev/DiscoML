import type { DiscoImport } from "@plugin/discoResolver"

export function getDiscoSource ( input: string | DiscoImport ): string {
	// eslint-disable-next-line no-useless-assignment
	let sourceText: string = ""

	if ( ( input as DiscoImport )?.path ) {
		sourceText = ( input as DiscoImport ).content
	} else {
		sourceText = input as string
	}

	return sourceText.replaceAll( "\r\n", "\n" )
}
