import { createRequire } from "module";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const require = createRequire(import.meta.url);
const emotionPlugin = require("@emotion/eslint-plugin");

export default [
  { ignores: ["build/**", "node_modules/**"] },
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs.flat.recommended,
  {
    plugins: { "@emotion": emotionPlugin },
    settings: { react: { version: "19" } },
    rules: {
      // Overrides
      "react/display-name": "off",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",

      // Emotion
      "@emotion/pkg-renaming": "error",
      "@emotion/jsx-import": "off",
      "@emotion/no-vanilla": "error",
      "@emotion/import-from-emotion": "error",
      "@emotion/styled-import": "error",
    },
  },
];
