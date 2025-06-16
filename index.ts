import testComponent from "@test/lang/tokenizer/basic.dml"

import { Tokenizer } from "@tokenizer/tokenizer"

const toknenizer = new Tokenizer( testComponent )
const tokens = toknenizer.tokenize()
console.log( tokens )