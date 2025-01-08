// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  settings: {
    // 'no-warn-ignored': true,
  },
  rules: {
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'any',
        },
      },
    ],
  },
});
