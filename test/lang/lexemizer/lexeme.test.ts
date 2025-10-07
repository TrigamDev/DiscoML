import {
	Lexeme, LexemeType
} from "@disco/lang/lexemizer/lexeme"
import {
	expect, test
} from "bun:test"

test( "Lexeme.typeFromChar() normal", () => {
	expect( Lexeme.typeFromChar( " " ) ).toBe( LexemeType.Whitespace )
	expect( Lexeme.typeFromChar( "\n" ) ).toBe( LexemeType.Whitespace )
	expect( Lexeme.typeFromChar( "\r" ) ).toBe( LexemeType.Whitespace )
	expect( Lexeme.typeFromChar( "\r\n" ) ).toBe( LexemeType.Whitespace )
	expect( Lexeme.typeFromChar( "\t" ) ).toBe( LexemeType.Whitespace )
	expect( Lexeme.typeFromChar( "a" ) ).toBe( LexemeType.Word )
	expect( Lexeme.typeFromChar( "A" ) ).toBe( LexemeType.Word )
	expect( Lexeme.typeFromChar( "0" ) ).toBe( LexemeType.Word )
	expect( Lexeme.typeFromChar( "z" ) ).toBe( LexemeType.Word )
	expect( Lexeme.typeFromChar( "Z" ) ).toBe( LexemeType.Word )
	expect( Lexeme.typeFromChar( "9" ) ).toBe( LexemeType.Word )
	expect( Lexeme.typeFromChar( "9" ) ).toBe( LexemeType.Word )
	expect( Lexeme.typeFromChar( '"' ) ).toBe( LexemeType.Special )
	expect( Lexeme.typeFromChar( "'" ) ).toBe( LexemeType.Special )
	expect( Lexeme.typeFromChar( "=" ) ).toBe( LexemeType.Special )
	expect( Lexeme.typeFromChar( "<" ) ).toBe( LexemeType.Special )
	expect( Lexeme.typeFromChar( ">" ) ).toBe( LexemeType.Special )
} )

test( "Lexeme.typeFromChar() diacritics", () => {
	expect( Lexeme.typeFromChar( "À" ) ).toBe( LexemeType.Word )
	expect( Lexeme.typeFromChar( "â" ) ).toBe( LexemeType.Word )
	expect( Lexeme.typeFromChar( "Á" ) ).toBe( LexemeType.Word )
} )
