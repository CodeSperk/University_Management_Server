import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["src/**/*.{ts,tsx,js}"], // Restrict linting to only TS/TSX files in src
  },
  {
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    },
  },
  {
    ignores: ["node_modules/", "dist/"], // Ensure dist is ignored
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
