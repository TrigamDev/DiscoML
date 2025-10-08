import { Tokenizer } from "@disco/lang/tokenizer/tokenizer"
import { getDiscoSource } from "@disco/util"
import testComponent from "@test/components/featured.dml"

const testSource: string = getDiscoSource( testComponent )
const toknenizer = new Tokenizer( testSource )
const tokens = toknenizer.tokenize()
console.log( tokens )
