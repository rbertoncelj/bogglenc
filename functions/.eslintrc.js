module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    quotes: ['error', 'single'],
    'import/no-unresolved': 0,
    indent: ['error', 2],
    'require-jsdoc': 0,
    'valid-jsdoc': 0,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '_', varsIgnorePattern: '_' },
    ],
  },
};
