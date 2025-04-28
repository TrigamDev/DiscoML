import { Parser } from "./src/parser"

const testComponent = await (Bun.file( "./test/parsing/test.component" )).text()
const parser = new Parser( testComponent ).parse()