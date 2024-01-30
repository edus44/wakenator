module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:jsdoc/recommended-typescript-flavor',
    'prettier',
  ],
  rules: {
    'jsdoc/require-returns': 0,
    'jsdoc/require-param-description': 0,
    'jsdoc/require-property-description': 0,
    'jsdoc/require-returns-description': 0,
    'jsdoc/tag-lines': 0,
  },
}
