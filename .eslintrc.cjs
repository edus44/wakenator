module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'lines-between-class-members': 0,

    'eqeqeq': 0,
    'no-console': 1,
    'no-debugger': 1,
  },
}
