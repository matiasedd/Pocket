module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    camelcase: 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'react/style-prop-object': 'off',
    'react/jsx-filename-extension': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [2, { extensions: ['.ts', '.tsx'] }],
  },
};
