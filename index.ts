import testComponent from "./test/lang/tokenizer/basic.dml"

import { Tokenizer } from "@tokenizer/tokenizer"

const toknenizer = new Tokenizer( testComponent )
console.log( toknenizer.tokenize() )