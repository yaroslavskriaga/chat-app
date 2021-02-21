module.exports = {
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: [
          'tsconfig.*?.json',
          'e2e/tsconfig.json'
        ],
        createDefaultProgram: true
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'airbnb-typescript/base'
      ],
      rules: {
        'linebreak-style': 'off',
        'no-extra-boolean-cast': 'off',
        'class-methods-use-this': 1,
        'import/prefer-default-export': 'off',
        'no-use-before-define': 'off',
        'no-unused-vars': 1,
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-param-reassign': 'off',
        'prefer-arrow/prefer-arrow-functions': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'operator-linebreak': 'off',
        'jsdoc/no-types': 'off',
        '@typescript-eslint/class-name-casing': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/tslint/config': 'off',
        '@typescript-eslint/array-type': 'off',
        indent: 'off',
        '@typescript-eslint/indent': [
          'error',
          2,
          {
            FunctionDeclaration: {
              parameters: 'first',
            },
            FunctionExpression: {
              parameters: 'first',
            },
          },
        ],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],
        '@typescript-eslint/member-ordering': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-body-style': 'error',
        camelcase: 'off',
        complexity: 'off',
        'constructor-super': 'error',
        curly: 'error',
        'dot-notation': 'error',
        'eol-last': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'id-blacklist': ['error', 'any', 'Number', 'number', 'String', 'string', 'Boolean', 'boolean', 'Undefined'],
        'id-match': 'error',
        'import/no-deprecated': 'warn',
        'max-classes-per-file': 'off',
        'max-len': [
          'error',
          {
            code: 140,
          },
        ],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': [
          'error',
          {
            allow: [
              'log',
              'warn',
              'dir',
              'timeLog',
              'assert',
              'clear',
              'count',
              'countReset',
              'group',
              'groupEnd',
              'table',
              'dirxml',
              'error',
              'groupCollapsed',
              'Console',
              'profile',
              'profileEnd',
              'timeStamp',
              'context',
            ],
          },
        ],
        'no-debugger': 'error',
        'no-empty': 'off',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-invalid-this': 'off',
        'no-new-wrappers': 'error',
        'no-restricted-imports': ['error', 'rxjs/Rx'],
        'no-shadow': [
          'error',
          {
            hoist: 'all',
          },
        ],
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'quote-props': ['error', 'as-needed'],
        radix: 'error',
        'space-before-function-paren': [
          'error',
          {
            anonymous: 'never',
            asyncArrow: 'always',
            named: 'never',
          },
        ],
        'spaced-comment': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'off',
      },
    },
    {
      files: ['*.component.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        'max-len': ['error', { 'code': 140 }]
      }
    },
    {
      files: ['*.component.ts'],
      extends: ['plugin:@angular-eslint/template/process-inline-templates']
    }
  ],
};
