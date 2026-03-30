import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default [
	{ files: ["**/*.{js,mjs,cjs,jsx}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
];
