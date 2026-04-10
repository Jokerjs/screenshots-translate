module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: [
    'standard',
    'standard-jsx',
    'standard-react',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // 1. 变量未使用
    '@typescript-eslint/no-unused-vars': 'off',

    // 2. 禁止 any
    '@typescript-eslint/no-explicit-any': 'off',

    // 3. React Hooks 依赖检查
    'react-hooks/exhaustive-deps': 'off'
  },
  ignorePatterns: [
    'src/Screenshots/fonts/**'
  ]
}
