import testComponent from "./test/parsing/test.dml"

import { Parser } from "./src/parser"

const component = testComponent
const parser = new Parser( component ).parse()