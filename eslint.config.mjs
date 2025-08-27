import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { globalIgnores } from "@eslint/config-helpers";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import unicornPlugin from "eslint-plugin-unicorn";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  globalIgnores([".next", ".vercel", ".wrangler", "public", "**/*.d.ts"]),
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      unicorn: unicornPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "object",
            "type",
            "index",
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "react**",
              group: "external",
              position: "before",
            },
            {
              pattern: "{next/**,next}",
              group: "external",
              position: "before",
            },
            {
              pattern: "{@**}",
              group: "external",
              position: "before",
            },
            {
              pattern: "{@/**}",
              group: "internal",
              position: "before",
            },
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
