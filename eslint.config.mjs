// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  settings: {
    'no-warn-ignored': true,
  },
  rules: {
    // 'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_$',
        caughtErrorsIgnorePattern: '^_$',
      },
    ],
  },
});
// Your custom configs here
