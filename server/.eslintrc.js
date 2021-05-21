module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    camelcase: 'off',
    'no-unused-expressions': 'off',
    'max-len': ['error', { code: 200 }],
  },
};
