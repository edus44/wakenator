module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:jsdoc/recommended-typescript-flavor',
    'prettier',
  ],
  rules: {
    // 'eqeqeq': 0,
    // 'no-console': 1,
    // 'no-debugger': 1,

    'jsdoc/require-returns': 0,
    'jsdoc/require-param-description': 0,
  },
}
