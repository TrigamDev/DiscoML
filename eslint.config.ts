/*
	eslint-disable
	no-magic-numbers,
	max-lines,
	@stylistic/max-len
*/

import jseslint from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import { defineConfig } from "eslint/config"
import dependPlugin from "eslint-plugin-depend"
import { importX as importPlugin } from "eslint-plugin-import-x"
import globals from "globals"
import { plugin as tslintPlugin } from "typescript-eslint"

export default defineConfig( [
	{
		files: [ "**/*.{js,mjs,cjs,ts,mts,cts}" ],

		plugins: {
			jseslint,
			"@tslint": tslintPlugin,
			"@stylistic": stylistic,
			"@import": importPlugin as any,
			"@depend": dependPlugin
		},
		extends: [],

		languageOptions: {
			parser: tsParser,
			parserOptions: { projectService: true },
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				... globals.nodeBuiltin,
				"Bun": "readonly"
			}
		},

		rules: {
			/*
				Style
				-----
				- Mainly just opinionated styling, positioning, and spacing
			*/
			// Naming
			"camelcase": [ "warn", {
				properties: "never",
				ignoreDestructuring: true,
				ignoreImports: true,
				ignoreGlobals: true
			} ],
			"capitalized-comments": "warn",
			"@stylistic/jsx-pascal-case": [ "warn", {
				allowAllCaps: false,
				allowLeadingUnderscore: false,
				allowNamespace: false
			} ],
			"new-cap": [ "warn", {
				newIsCap: true,
				capIsNew: true,
				properties: true
			} ],
			"no-underscore-dangle": "warn",

			// Quotes
			"@stylistic/jsx-quotes": [ "warn", "prefer-double" ],
			"@stylistic/quote-props": [ "warn", "consistent" ],
			"@stylistic/quotes": [ "warn", "double", { avoidEscape: true } ],

			// Semicolons/Commas
			"@stylistic/comma-style": [ "warn", "last" ],
			"@stylistic/member-delimiter-style": [ "warn", {
				multiline: {
					delimiter: "none",
					requireLast: false
				},
				singleline: {
					delimiter: "semi",
					requireLast: false
				},
				multilineDetection: "brackets"
			} ],
			"@stylistic/semi": [ "warn", "never" ],
			"@stylistic/semi-style": [ "warn", "last" ],

			// Braces/Parentheses/Tags
			"arrow-body-style": [ "warn", "as-needed", { requireReturnForObjectLiteral: true } ],
			"@stylistic/arrow-parens": [ "warn", "always" ],
			"@stylistic/brace-style": [ "warn", "1tbs" ],
			"curly": [ "warn", "multi-line" ],
			"@stylistic/jsx-closing-bracket-location": [ "warn", "line-aligned" ],
			"@stylistic/jsx-closing-tag-location": [ "warn", "line-aligned" ],
			"@stylistic/new-parens": [ "warn", "always" ],
			"@stylistic/wrap-iife": [ "warn", "inside" ],
			"@stylistic/wrap-regex": "warn",

			// Dot
			"@stylistic/dot-location": [ "warn", "property" ],
			"dot-notation": "warn",

			// Comments
			"@stylistic/multiline-comment-style": [ "warn", "bare-block" ],
			"no-inline-comments": "off",
			"no-warning-comments": "off",

			// Spacing
			"@stylistic/array-bracket-spacing": [ "warn", "always" ],
			"@stylistic/arrow-spacing": "warn",
			"@stylistic/block-spacing": "warn",
			"@stylistic/comma-spacing": [ "warn", {
				before: false,
				after: true
			} ],
			"@stylistic/computed-property-spacing": [ "warn", "always" ],
			"@stylistic/function-call-spacing": [ "warn", "never" ],
			"@stylistic/generator-star-spacing": [ "warn", {
				before: false,
				after: true
			} ],
			"@stylistic/indent": [ "warn", "tab" ],
			"@stylistic/indent-binary-ops": [ "warn", "tab" ],
			"@stylistic/jsx-child-element-spacing": "warn",
			"@stylistic/jsx-curly-spacing": [ "warn", { when: "always" } ],
			"@stylistic/jsx-equals-spacing": [ "warn", "never" ],
			"@stylistic/jsx-indent-props": [ "warn", "tab" ],
			"@stylistic/jsx-tag-spacing": [ "warn", {
				closingSlash: "never",
				beforeSelfClosing: "proportional-always",
				afterOpening: "never",
				beforeClosing: "never"
			} ],
			"@stylistic/key-spacing": [ "warn", {
				beforeColon: false,
				afterColon: true,
				mode: "strict"
			} ],
			"@stylistic/keyword-spacing": [ "warn", {
				before: true,
				after: true
			} ],
			"@stylistic/no-mixed-spaces-and-tabs": "warn",
			"@stylistic/no-multi-spaces": "warn",
			"@stylistic/no-tabs": "off",
			"@stylistic/no-trailing-spaces": "warn",
			"@stylistic/no-whitespace-before-property": "warn",
			"@stylistic/object-curly-spacing": [ "warn", "always" ],
			"@stylistic/rest-spread-spacing": [ "warn", "always" ],
			"@stylistic/semi-spacing": [ "warn", {
				before: false,
				after: true
			} ],
			"@stylistic/space-before-blocks": [ "warn", "always" ],
			"@stylistic/space-before-function-paren": [ "warn", "always" ],
			"@stylistic/space-in-parens": [ "warn", "always" ],
			"@stylistic/space-infix-ops": [ "warn", {
				int32Hint: true,
				ignoreTypes: false
			} ],
			"@stylistic/space-unary-ops": [ "warn", {
				words: true,
				nonwords: false
			} ],
			"@stylistic/spaced-comment": [ "warn", "always" ],
			"@stylistic/switch-colon-spacing": [ "warn", {
				before: false,
				after: true
			} ],
			"@stylistic/template-curly-spacing": [ "warn", "always" ],
			"@stylistic/template-tag-spacing": [ "warn", "never" ],
			"@stylistic/type-annotation-spacing": [ "warn", {
				before: false,
				after: true
			} ],
			"@stylistic/type-generic-spacing": "warn",
			"@stylistic/type-named-tuple-spacing": "warn",
			"@stylistic/yield-star-spacing": [ "warn", {
				before: false,
				after: true
			} ],

			// Lines
			"@tslint/adjacent-overload-signatures": "warn",
			"@stylistic/array-bracket-newline": [ "warn", "consistent" ],
			"@stylistic/array-element-newline": [ "warn", "consistent" ],
			"@stylistic/curly-newline": [ "warn", {
				multiline: true,
				consistent: true,
				minElements: 2
			} ],
			"@stylistic/eol-last": [ "warn", "always" ],
			"@stylistic/function-call-argument-newline": [ "warn", "consistent" ],
			"@stylistic/function-paren-newline": "off",
			"@stylistic/implicit-arrow-linebreak": [ "warn", "beside" ],
			"@stylistic/jsx-curly-newline": [ "warn", {
				singleline: "forbid",
				multiline: "require"
			} ],
			"@stylistic/jsx-first-prop-new-line": [ "warn", "multiline" ],
			"@stylistic/jsx-function-call-newline": [ "warn", "multiline" ],
			"@stylistic/jsx-wrap-multilines": [ "warn", {
				declaration: "parens-new-line",
				assignment: "parens-new-line",
				return: "parens-new-line",
				arrow: "parens-new-line",
				condition: "parens-new-line",
				logical: "parens-new-line",
				prop: "parens-new-line",
				propertyValue: "parens"
			} ],
			"@stylistic/linebreak-style": [ "warn", "windows" ],
			"@stylistic/lines-around-comment": [ "warn", {
				beforeBlockComment: true,
				afterBlockComment: false,
				beforeLineComment: true,
				afterLineComment: false,
				allowBlockStart: true,
				allowBlockEnd: true,
				allowObjectStart: true,
				allowObjectEnd: true,
				allowArrayStart: true,
				allowArrayEnd: true,
				allowClassStart: true,
				allowClassEnd: true,
				allowEnumStart: true,
				allowEnumEnd: true,
				allowInterfaceStart: true,
				allowInterfaceEnd: true,
				allowModuleStart: true,
				allowModuleEnd: true,
				allowTypeStart: true,
				allowTypeEnd: true
			} ],
			"@stylistic/lines-between-class-members": [ "warn", "always", {
				exceptAfterSingleLine: true,
				exceptAfterOverload: false
			} ],
			"@stylistic/line-comment-position": "off",
			"@stylistic/multiline-ternary": [ "warn", "always-multiline" ],
			"@import/newline-after-import": [ "warn", { count: 1 } ],
			"@stylistic/newline-per-chained-call": [ "warn", { ignoreChainWithDepth: 2 } ],
			"@stylistic/no-multiple-empty-lines": "warn",
			"@stylistic/nonblock-statement-body-position": [ "warn", "beside" ],
			"@stylistic/object-curly-newline": [ "warn", {
				minProperties: 2,
				multiline: true,
				consistent: true
			} ],
			"@stylistic/object-property-newline": "warn",
			"@stylistic/operator-linebreak": [ "warn", "before" ],
			"@stylistic/padded-blocks": [ "warn", "never" ],
			"@stylistic/padding-line-between-statements": [ "warn", {
				blankLine: "always",
				prev: "*",
				next: "return"
			} ],

			/*
				Convention/Consistency
				----------------------
				- Formatting to stay consistent throughout
				  the codebase
			*/
			"accessor-pairs": "off",
			"class-methods-use-this": "warn",
			"consistent-this": "off",
			"default-case": "warn",
			"default-case-last": "warn",
			"default-param-last": "warn",
			"@import/extensions": [ "warn", "always", {
				ignorePackages: true,
				pattern: {
					"js": "never",
					"ts": "never"
				}
			} ],
			"@import/exports-last": "warn",
			"@import/first": "warn",
			"func-style": [ "warn", "declaration", {
				allowArrowFunctions: true,
				allowTypeAnnotation: true
			} ],
			"grouped-accessor-pairs": "off",
			"@import/group-exports": "warn",
			"init-declarations": [ "warn", "always" ],
			"logical-assignment-operators": [ "warn", "always" ],
			"no-irregular-whitespace": "warn",
			"no-alert": "warn",
			"@import/no-amd": "warn",
			"@import/no-absolute-path": "warn",
			"no-array-constructor": "warn",
			"no-bitwise": "off",
			"no-caller": "warn",
			"@import/no-commonjs": "warn",
			"no-console": "off",
			"@import/no-dynamic-require": "warn",
			"@import/no-import-module-exports": "warn",
			"@import/no-internal-modules": "off",
			"no-multi-str": "warn",
			"@import/no-named-export": "off",
			"@import/no-namespace": "off",
			"no-negated-condition": "off",
			"@import/no-nodejs-modules": "off",
			"@import/no-relative-packages": "warn",
			"@import/no-relative-parent-imports": "warn",
			"@import/no-webpack-loader-syntax": "warn",
			"object-shorthand": [ "warn", "always" ],
			"one-var": [ "warn", "never" ],
			"operator-assignment": [ "warn", "always" ],
			"prefer-arrow-callback": "warn",
			"@import/prefer-default-export": "off",
			"prefer-destructuring": "warn",
			"prefer-exponentiation-operator": "warn",
			"prefer-numeric-literals": "warn",
			"prefer-object-has-own": "warn",
			"prefer-object-spread": "warn",
			"prefer-regex-literals": "warn",
			"prefer-rest-params": "warn",
			"prefer-spread": "warn",
			"prefer-template": "warn",
			"strict": "off",
			"yoda": "off",
			"unicode-bom": [ "warn", "never" ],

			// Sorting
			"@stylistic/jsx-sort-props": "off",
			"@import/order": [ "warn", {
				"alphabetize": {
					order: "asc",
					caseInsensitive: true
				},
				"distinctGroup": false,
				"named": true,
				"newlines-between-types": "never",
				"newlines-between": "always",
				"sortTypesGroup": true,
				"warnOnUnassignedImports": true,
				"groups": [
					"builtin",
					"external",
					"internal",
					[ "parent", "sibling" ],
					"index",
					"unknown",
					"object",
					"type"
				],
				"pathGroups": [
					{
						pattern: "@disco/**",
						group: "internal",
						position: "before"
					},
					{
						pattern: "@plugin/**",
						group: "internal",
						position: "before"
					},
					{
						pattern: "@lexemizer/**",
						group: "internal",
						position: "before"
					},
					{
						pattern: "@tokenizer/**",
						group: "internal",
						position: "before"
					},
					{
						pattern: "@parser/**",
						group: "internal",
						position: "before"
					},
					{
						pattern: "@test/**",
						group: "internal",
						position: "before"
					}
				]
			} ],
			"sort-imports": "off",
			"sort-keys": "off",
			"sort-vars": "off",

			/*
				Complexity
				----------
				- Prevent too much complexity in the codebase
				  to improve readability
			*/
			"complexity": [ "warn", {
				max: 20,
				variant: "modified"
			} ],
			"@stylistic/jsx-max-props-per-line": [ "warn", { maximum: 3 } ],
			"@stylistic/jsx-one-expression-per-line": [ "warn", { allow: "non-jsx" } ],
			"max-classes-per-file": "off",
			"max-depth": [ "warn", { max: 4 } ],
			"@import/max-dependencies": "off",
			"@stylistic/max-len": [ "warn", { code: 100 } ],
			"max-lines": [ "warn", {
				max: 350,
				skipBlankLines: true,
				skipComments: true
			} ],
			"max-lines-per-function": [ "warn", {
				max: 50,
				skipBlankLines: true,
				skipComments: true
			} ],
			"max-nested-callbacks": [ "warn", { max: 10 } ],
			"max-params": [ "warn", {
				max: 5,
				countVoidThis: true
			} ],
			"max-statements": [ "warn", 50, { ignoreTopLevelFunctions: false } ],
			"@stylistic/max-statements-per-line": [ "warn", {
				max: 3,
				ignoredNodes: [ "BreakStatement" ]
			} ],
			"no-continue": "off",
			"no-labels": "off",
			"no-nested-ternary": "warn",
			"no-ternary": "off",
			"@stylistic/one-var-declaration-per-line": "off",

			/*
				Disambiguation
				--------------
				- Behavior that is likely unintuitive and unwanted
				- Syntax that may be confusing and hard to read
				- Amibguous or unclear names
			*/

			// Unintuitive/unexpected behavior
			"block-scoped-var": "warn",
			"eqeqeq": "error",
			"guard-for-in": "error",
			"no-case-declarations": "error",
			"no-compare-neg-zero": "error",
			"no-delete-var": "error",
			"no-dupe-args": "error",
			"no-dupe-class-members": "error",
			"no-dupe-else-if": "error",
			"no-dupe-keys": "error",
			"no-duplicate-case": "error",
			"no-eq-null": "error",
			"no-implicit-globals": "error",
			"no-invalid-this": "error",
			"no-loop-func": "error",
			"no-loss-of-precision": "error",
			"no-misleading-character-class": "error",
			"no-nonoctal-decimal-escape": "error",
			"no-octal": "error",
			"no-plusplus": "off",
			"no-sequences": "error",
			"no-var": "error",
			"require-unicode-regexp": [ "error", { requireFlag: "v" } ],
			"@import/unambiguous": "error",
			"use-isnan": [ "error", {
				enforceForSwitchCase: true,
				enforceForIndexOf: true
			} ],

			// Assumption breaks
			"consistent-return": "error",
			"no-extend-native": "error",
			"no-global-assign": "error",
			"@import/no-mutable-exports": "error",
			"@import/no-named-default": "off",
			"@import/no-named-as-default": "error",
			"@import/no-named-as-default-member": "error",
			"no-object-constructor": "error",
			"no-param-reassign": "error",
			"no-redeclare": "error",
			"no-shadow": "error",
			"no-shadow-restricted-names": "error",
			"no-throw-literal": "error",
			"no-undefined": "error",
			"prefer-const": "error",
			"preserve-caught-error": "error",

			// Confusing/hard-to-read syntax
			"@stylistic/no-confusing-arrow": "warn",
			"no-div-regex": "warn",
			"no-implicit-coercion": "warn",
			"@stylistic/no-mixed-operators": "warn",
			"no-multi-assign": "warn",
			"no-regex-spaces": "warn",
			"no-return-assign": "warn",
			"no-unexpected-multiline": "warn",
			"no-void": "warn",
			"no-with": "warn",

			// Disambiguous/descriptive naming
			"func-name-matching": "warn",
			"func-names": [ "warn", "as-needed", { generators: "as-needed" } ],
			"id-length": [ "warn", {
				min: 2,
				exceptions: [
					"id"
				]
			} ],
			"@import/no-anonymous-default-export": [ "warn", {
				allowArray: true,
				allowArrowFunction: false,
				allowAnonymousClass: false,
				allowAnonymousFunction: false,
				allowCallExpression: true,
				allowLiteral: false,
				allowObject: true,
				allowNew: true
			} ],
			"no-label-var": "warn",
			"no-magic-numbers": [ "warn", {
				ignore: [ 0 ]
			} ],
			"prefer-named-capture-group": "warn",
			"radix": [ "error", "as-needed" ],
			"symbol-description": "warn",
			"vars-on-top": "off",

			/*
				Inefficiencies
				-------------
				- Oversights that result in more work being done
				  than neccessary
				- Unneccesary formatting and syntax
			*/
			"@stylistic/comma-dangle": [ "warn", "never" ],
			"@import/dynamic-import-chunkname": "off",
			"@stylistic/jsx-curly-brace-presence": [ "warn", {
				props: "never",
				children: "never",
				propElementValues: "always"
			} ],
			"@stylistic/jsx-self-closing-comp": "warn",
			"no-constant-binary-expression": "warn",
			"@import/no-duplicates": "warn",
			"no-duplicate-imports": "warn",
			"no-else-return": "warn",
			"no-empty": "warn",
			"no-empty-function": "warn",
			"@import/no-empty-named-blocks": "warn",
			"no-empty-static-block": "warn",
			"no-extra-bind": "warn",
			"no-extra-boolean-cast": "warn",
			"no-extra-label": "warn",
			"@stylistic/no-extra-parens": [ "warn", "all", {
				returnAssign: false,
				nestedBinaryExpressions: false,
				ternaryOperandBinaryExpressions: false,
				enforceForSequenceExpressions: true,
				enforceForFunctionPrototypeMethods: true,
				nestedConditionalExpressions: false
			} ],
			"@stylistic/no-extra-semi": "warn",
			"@stylistic/no-floating-decimal": "warn",
			"no-lone-blocks": "warn",
			"no-lonely-if": "warn",
			"no-new": "warn",
			"no-new-wrappers": "warn",
			"no-promise-executor-return": "warn",
			"no-self-assign": "warn",
			"no-self-compare": "warn",
			"no-setter-return": "warn",
			"@import/no-unassigned-import": [ "warn", {
				allow: [
					"*.css"
				]
			} ],
			"no-undef-init": "warn",
			"no-unneeded-ternary": "warn",
			"no-unreachable": "warn",
			"no-unreachable-loop": "warn",
			"no-unused-expressions": "warn",
			"no-unused-labels": "warn",
			"@import/no-unused-modules": "warn",
			"no-unused-private-class-members": "warn",
			"no-unused-vars": "warn",
			"no-useless-assignment": "warn",
			"no-useless-backreference": "warn",
			"no-useless-call": "warn",
			"no-useless-catch": "warn",
			"no-useless-computed-key": "warn",
			"no-useless-concat": "warn",
			"no-useless-constructor": "warn",
			"no-useless-escape": "warn",
			"@import/no-useless-path-segments": "warn",
			"no-useless-rename": "warn",
			"no-useless-return": "warn",
			"require-await": "warn",
			"require-yield": "warn",

			/*
				Logic Errors
				------------
				- Possible errors in logic that results in the program
				  not functioning as intended
			*/
			"array-callback-return": [ "error", {
				checkForEach: true,
				allowVoid: true
			} ],
			"constructor-super": "error",
			"@import/default": "error",
			"@import/export": "error",
			"for-direction": "error",
			"getter-return": "error",
			"@import/named": "error",
			"@import/namespace": "error",
			"no-async-promise-executor": "error",
			"no-await-in-loop": "error",
			"no-class-assign": "error",
			"no-cond-assign": "error",
			"no-const-assign": "error",
			"no-constant-condition": "error",
			"no-constructor-return": "error",
			"no-control-regex": "error",
			"@import/no-cycle": "error",
			"no-debugger": "error",
			"no-empty-character-class": "error",
			"no-empty-pattern": "error",
			"no-ex-assign": "error",
			"@import/no-extraneous-dependencies": "error",
			"no-fallthrough": "error",
			"no-func-assign": "error",
			"no-import-assign": "error",
			"no-inner-declarations": "error",
			"no-invalid-regexp": "error",
			"no-iterator": "error",
			"no-new-native-nonconstructor": "error",
			"no-obj-calls": "error",
			"no-prototype-builtins": "error",
			"@import/no-self-import": "error",
			"no-sparse-arrays": "error",
			"no-template-curly-in-string": "error",
			"no-this-before-super": "error",
			"no-unassigned-vars": "error",
			"no-undef": "error",
			"no-unmodified-loop-condition": "error",
			"@import/no-unresolved": "off",
			"no-unsafe-finally": "error",
			"no-unsafe-negation": "error",
			"no-unsafe-optional-chaining": "error",
			"no-use-before-define": "error",
			"prefer-promise-reject-errors": "error",
			"require-atomic-updates": "error",
			"valid-typeof": "error",

			/*
				Security
				-------------
				- Things that could introduce secuity issues to
				  the program
			*/
			"no-eval": "error",
			"no-implied-eval": "error",
			"no-new-func": "error",
			"no-script-url": "error",

			/*
				Deprecated
				-------------
				- Features or functionality that's deprecated or
				  otherwise lacking, and should be replaced with alternatives
			*/
			"@depend/ban-dependencies": [ "error", {
				presets: [
					"microutilities",
					"native",
					"preferred"
				]
			} ],
			"@import/no-deprecated": "error",
			"no-octal-escape": "error",
			"no-proto": "error",

			/*
				Restricted Patterns
				-------------------
				- Lists of restricted names and patterns, for
				  various reasons
			*/
			"id-denylist": [
				"warn",
				"data",
				"error",
				"err",
				"e",
				"callback",
				"cb"
			],
			"id-match": "off",
			"no-restricted-exports": "off",
			"no-restricted-globals": "off",
			"no-restricted-imports": "off",
			"@import/no-restricted-paths": "off",
			"no-restricted-properties": "off",
			"no-restricted-syntax": "off"
		}
	}
] )
