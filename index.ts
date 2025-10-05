import testComponent from "@test/lang/tokenizer/basic.dml"

import { TokenStream } from "@disco/lang/tokenizer/tokenStream"

const toknenizer = new TokenStream(testComponent)
const tokens = toknenizer.tokenize()
console.log(tokens)
