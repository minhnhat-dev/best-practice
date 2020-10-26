module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    jest: true,
  },
  // extends: 'airbnb',
  // parserOptions: {
  //   ecmaVersion: 11,
  // },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  globals: {
    logger: true,
    io: true,
  },
  parser: '/Users/nhatnguyen/.nvm/versions/node/v12.18.3/lib/node_modules/babel-eslint',
  extends:['airbnb', 'plugin:import/warnings'],
  rules: {
    'no-eval': 1,
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
    'no-undef': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': 'warn',
    'constructor-super': 'warn',
    'valid-typeof': 'warn',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'no-implicit-globals': 'off',
    'prefer-destructuring': ['error', {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: false,
        object: false,
      },
    }, {
      enforceForRenamedProperties: false,
    }],
    'no-param-reassign': ['error', { props: false }],
    'no-use-before-define': ['error', { functions: false }],
    'max-len': ['warn', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true }],
    'object-curly-newline': ['error', { ExportDeclaration: { multiline: true, minProperties: 4 } }],
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['time', 'timeEnd', 'timeLog'] }],
    // 'object-curly-newline': ['error',  {
    //   // ObjectExpression: { minProperties: 6, consistent: true },
    //   // ObjectPattern: { minProperties: 4, consistent: true },
    //   ImportDeclaration: { minProperties: 4, consistent: true, multiline: true },
    //   ExportDeclaration: { minProperties: 4, consistent: true, multiline: true },
    //   }],
  },
};
