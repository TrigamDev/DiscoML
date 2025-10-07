import { TokenStream } from "@disco/lang/tokenizer/tokenStream"
import testComponent from "@test/lang/tokenizer/basic.dml"


const toknenizer = new TokenStream( testComponent )
const tokens = toknenizer.tokenize()
console.log( tokens )
