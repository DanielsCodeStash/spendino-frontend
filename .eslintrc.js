module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-destructuring': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'import/no-named-as-default': 'off',
    'max-len': 'off',
    'linebreak-style': 'off',
    'no-trailing-spaces': 'off',
    'indent': 'off',
    'no-param-reassign': 'off',
    'padded-blocks': 'off',
    'no-undef': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
