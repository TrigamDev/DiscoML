import {
	type Token, type TokenObject
} from "@disco/lang/tokenizer/token"
import { Tokenizer } from "@disco/lang/tokenizer/tokenizer"
import { TokenType } from "@disco/lang/tokenizer/tokenTypes"
import { getDiscoSource } from "@disco/util"
import testComponent from "@test/components/featured.dml"

const testSource: string = getDiscoSource( testComponent )
const toknenizer = new Tokenizer( testSource )
const tokens = toknenizer.drain()

console.log(
	tokens.map( ( token: Token ) => {
		const tokenObject: TokenObject = token.toJSON()
		const strType: string = TokenType[ tokenObject.type ]

		return {
			type: strType,
			content: tokenObject.content,
			span: tokenObject.span
		}
	} )
)

console.log(
	tokens.map( ( token: Token ) => token.toString() ).join( "" )
)
