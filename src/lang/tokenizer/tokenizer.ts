import { DmlParseError } from "@disco/error"
import {
	Location, LocationSpan
} from "@disco/lang/location"
import {
	Token,
	TokenType
} from "@tokenizer/token"
import {
	booleanLiteral,
	comment,
	commentMultiline,
	commentXml,
	identifier,
	nullLiteral,
	numericLiteral,
	stringLiteral,
	tagAttributeAssignment,
	tagBracketClose, tagBracketOpen,
	tagClosingSlash,
	whitespace
} from "@tokenizer/tokenPatterns"
import chalk from "chalk"

enum TokenizerState {
	// General
	Body,

	// Literals
	StringLiteral,
	NumberLiteral,
	BooleanLiteral,
	NullLiteral,

	// Tag Components
	TagOpen,
	TagMiddle,
	TagClose,
	TagAttributeName,
	TagAttributeAssignment,
	TagAttributeValue
}

const StateTypeMap: Map<TokenizerState, Map<TokenType, TokenizerState>> = new Map([
	[TokenizerState.Body, new Map<TokenType, TokenizerState>([
		[TokenType.TagBracketOpen, TokenizerState.TagOpen]
	])],

	[TokenizerState.TagOpen, new Map<TokenType, TokenizerState>([
		[TokenType.TagBracketClose, TokenizerState.Body],
		[TokenType.Whitespace, TokenizerState.TagMiddle]
	])],

	[TokenizerState.TagMiddle, new Map<TokenType, TokenizerState>([
		[TokenType.TagBracketClose, TokenizerState.TagClose],
		[TokenType.TagSelfClosingSlash, TokenizerState.TagClose],
		[TokenType.TagAttributeIdentifier, TokenizerState.TagAttributeName]
	])],

	[TokenizerState.TagClose, new Map<TokenType, TokenizerState>([
		[TokenType.TagBracketClose, TokenizerState.Body]
	])],

	[TokenizerState.TagAttributeName, new Map<TokenType, TokenizerState>([
		[TokenType.TagAttributeAssignment, TokenizerState.TagAttributeAssignment]
	])],

	[TokenizerState.TagAttributeAssignment, new Map<TokenType, TokenizerState>([
		[TokenType.StringLiteral, TokenizerState.TagAttributeValue]
	])],

	[TokenizerState.TagAttributeValue, new Map<TokenType, TokenizerState>([
		[TokenType.TagBracketClose, TokenizerState.Body],
		[TokenType.TagSelfClosingSlash, TokenizerState.TagClose],
		[TokenType.Whitespace, TokenizerState.TagMiddle]
	])]
]);

const TypePatternMap: Map<TokenType, RegExp> = new Map([
	[TokenType.TagIdentifier, identifier],
	[TokenType.TagAttributeIdentifier, identifier],
	[TokenType.StringLiteral, stringLiteral],
	[TokenType.NumberLiteral, numericLiteral],
	[TokenType.BooleanLiteral, booleanLiteral],
	[TokenType.NullLiteral, nullLiteral],
	[TokenType.Whitespace, whitespace],
	[TokenType.Comment, comment],
	[TokenType.XmlComment, commentXml],
	[TokenType.MultilineComment, commentMultiline],
]);

const StatePatternMap: Map<TokenizerState, Map<RegExp, TokenType>> = new Map([
	[TokenizerState.Body, new Map<RegExp, TokenType>([
		[tagBracketOpen, TokenType.TagBracketOpen],
		[comment, TokenType.Comment],
		[commentXml, TokenType.XmlComment],
		[commentMultiline, TokenType.MultilineComment]
	])],
	[TokenizerState.TagOpen, new Map<RegExp, TokenType>([
		[tagClosingSlash, TokenType.TagClosingSlash],
		[tagBracketClose, TokenType.TagBracketClose],
		[whitespace, TokenType.Whitespace],
		[identifier, TokenType.TagIdentifier]]
	)],
	[TokenizerState.TagMiddle, new Map<RegExp, TokenType>([
		[tagClosingSlash, TokenType.TagSelfClosingSlash],
		[whitespace, TokenType.Whitespace],
		[identifier, TokenType.TagAttributeIdentifier]]
	)],
	[TokenizerState.TagClose, new Map<RegExp, TokenType>([
		[tagBracketClose, TokenType.TagBracketClose]]
	)],
	[TokenizerState.TagAttributeName, new Map<RegExp, TokenType>([
		[tagAttributeAssignment, TokenType.TagAttributeAssignment],
		[whitespace, TokenType.Whitespace],
		[identifier, TokenType.TagAttributeIdentifier]]
	)],
	[TokenizerState.TagAttributeAssignment, new Map<RegExp, TokenType>([
		[whitespace, TokenType.Whitespace],
		[stringLiteral, TokenType.StringLiteral],
		[numericLiteral, TokenType.NumberLiteral],
		[booleanLiteral, TokenType.BooleanLiteral],
		[nullLiteral, TokenType.NullLiteral]]
	)],
	[TokenizerState.TagAttributeValue, new Map<RegExp, TokenType>([
		[tagClosingSlash, TokenType.TagClosingSlash],
		[tagBracketClose, TokenType.TagBracketClose],
		[whitespace, TokenType.Whitespace],
		[stringLiteral, TokenType.StringLiteral],
		[numericLiteral, TokenType.NumberLiteral],
		[booleanLiteral, TokenType.BooleanLiteral],
		[nullLiteral, TokenType.NullLiteral]]
	)]
]);

export class Tokenizer {
	private source: string
	private location: Location = new Location()

	private state: TokenizerState = TokenizerState.Body
	private isTokenizing: boolean = true

	private tokens: Token[] = []

	constructor(source: string) {
		this.source = source
	}

	tokenize(): Token[] {
		while (this.isTokenizing) {
			const token: Token = this.getToken()
			this.updateState(token.type)

			this.tokens.push(token)

			this.location.forward(token.content)
			this.isTokenizing = this.location.offset < this.source.length
		}

		return this.tokens
	}

	getChar(): string {
		return this.source.substring(
			this.location.offset,
			// eslint-disable-next-line no-magic-numbers
			this.location.offset + 1
		)
	}

	test(pattern: RegExp): boolean {
		return pattern.test(this.source.substring(this.location.offset))
	}

	match(pattern: RegExp): RegExpMatchArray | null {
		const matches: RegExpMatchArray | null = this.source
			.substring(this.location.offset)
			.match(pattern)

		return matches
	}

	getToken(): Token {
		const tokenType: TokenType = this.getTokenType()

		let tokenValue: string = this.getChar()
		let tokenPattern: RegExp | undefined = TypePatternMap.get(tokenType);

		if (tokenPattern) {
			const match = this.match(tokenPattern)
			if (match && match[0]) [tokenValue] = match
		}

		const tokenEnd: Location = this.location.clone()
		tokenEnd.forward(tokenValue)

		return new Token(
			tokenType,
			tokenValue,
			new LocationSpan(
				this.location.clone(),
				tokenEnd
			)
		)
	}

	// eslint-disable-next-line complexity
	getTokenType(): TokenType {
		const patternTypeMap = StatePatternMap.get(this.state);

		if (!patternTypeMap) {
			return TokenType.Text;
		}

		for (const [pattern, type] of patternTypeMap.entries()) {
			if (this.test(pattern)) {
				return type;
			}
		}

		return TokenType.Text;
	}

	updateState(lastType: TokenType): void {
		const state = StateTypeMap.get(this.state)?.get(lastType)

		if (state) {
			this.state = state;
		}
	}
}
