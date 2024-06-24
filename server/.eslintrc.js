import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'error',
            '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-debugger': 'error', // Disallow debugger statements
            'eqeqeq': ['error', 'always'], // Enforce the use of === and !==
            'curly': 'error', // Require following curly brace conventions
            'semi': ['error', 'always'], // Require semicolons
        },
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            rules: tseslint.configs.recommended.rules,
        },
        {
            files: ['*.js', '*.jsx'],
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            env: {
                browser: globals.browser,
            },
            extends: ['eslint:recommended'],
        },
    ],
};
