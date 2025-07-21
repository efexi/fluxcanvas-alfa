module.exports = {
  ignorePatterns: [
    '.eslintrc.js',
    '**/*.spec.ts',
    '**/*.e2e-spec.ts',
    '/app/i18n/*.ts',
    '/app/lib/xlsx'
  ],
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      env: {
        node: true
      },
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
      ],
      rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        'prettier/prettier': 'off',
        'semi': 'off',
        'quotes': 'off',
        'no-unused-vars': 'off'
      }
    },
    {
      files: ['*.vue'],
      extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/eslint-config-prettier'
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      env: {
        browser: true,
        es2021: true,
        node: true
      },
      rules: {
        'vue/no-multiple-template-root': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-v-for-template-key': 'off',
        'prettier/prettier': 'off'
      }
    }
  ]
}
