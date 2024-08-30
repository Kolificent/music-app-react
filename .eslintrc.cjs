module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-func'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-func/max-lines-per-function': [
      'warn',
      {
        max: 100,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true,
      },
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-constant-condition': 'warn',
    eqeqeq: 'warn',
    'no-debugger': 'warn',
    'no-compare-neg-zero': 'warn',
    'no-const-assign': 'warn',
    'no-self-assign': 'warn',
    'no-self-compare': 'warn',
    'no-unused-vars': 'warn',
    'valid-typeof': 'warn',
    'prefer-const': 'warn',
    'for-direction': 'warn',
    'no-shadow': 'warn',
  },
};
