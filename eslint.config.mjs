import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    rules: {
      // "no-unused-vars": "off",
      // "@typescript-eslint/no-unused-vars": "off",
      // "@typescript-eslint/ban-ts-comment": "warn",
      // "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-array-constructor": "off",
      // "react/no-unescaped-entities": "off",
    },
    ignorePatterns: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      ".next/",
      "out/",
      "public/",
      "scripts/",
      "cypress/",
      "playwright/",
      "jest.config.js",
      "jest.setup.js",
      "/src/generated/*",
    ],
  }),
]

export default eslintConfig
