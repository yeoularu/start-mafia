import { tanstackConfig } from '@tanstack/config/eslint'

export default [
  ...tanstackConfig,
  {
    ignores: ['dev-dist/**', 'eslint.config.js'],
  },
]
