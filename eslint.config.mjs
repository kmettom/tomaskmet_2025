// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  settings: {
    // 'no-warn-ignored': true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
});
