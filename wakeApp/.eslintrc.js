module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:vue/recommended',
    'prettier',
    'prettier/standard',
  ],
  rules: {
    'no-var': 1,
    'prefer-const': 1,
    'no-console': 1,
    'vue/require-v-for-key': 0,
    'vue/valid-v-on': 0,
    'vue/max-attributes-per-line': [2, { singleline: 2 }],
  },
}
