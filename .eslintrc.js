module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      modules: true,
    },
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:storybook/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "i18next"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "i18next/no-literal-string": 2,
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
  globals: {
    __IS_DEV__: true,
  },
};
