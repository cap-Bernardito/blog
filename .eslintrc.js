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
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "i18next", "simple-import-sort", "@conarti/feature-sliced"],
  settings: {
    react: {
      version: "detect",
    },
    "jsx-a11y": {
      components: {
        Button: "button",
      },
    },
  },
  rules: {
    "@conarti/feature-sliced/layers-slices": [
      "warn",
      {
        ignorePatterns: ["**/@x/**", "app/app-store", "app/app-router/*"],
      },
    ],
    "@conarti/feature-sliced/absolute-relative": "error",
    "@conarti/feature-sliced/public-api": "error",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^@?\\w"],
          ["^(app)(/.*|$)"],
          ["^(pages)(/.*|$)"],
          ["^(widgets)(/.*|$)"],
          ["^(features)(/.*|$)"],
          ["^(entities)(/.*|$)"],
          ["^(shared)(/.[^assets]|$)"],
          ["^(shared/assets)(/.*|$)"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "warn",
    "i18next/no-literal-string": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
  globals: {
    __IS_DEV__: true,
  },
};
