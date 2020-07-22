module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "@typescript-eslint/no-use-before-define": "off",
    "no-underscore-dangle": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/scripts/**/*.ts', '**/mock/**/*.ts'],
      env: { node: true },
      rules: {
        "import/no-dynamic-require": "off",
        "import/no-extraneous-dependencies": "off",
        "import/no-extraneous-dependencies": "off",
        "global-require": "off",
      }
    }
  ],
};
