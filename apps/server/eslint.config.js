import eslint from '@eslint/js'
import { importX } from 'eslint-plugin-import-x'
import { defineConfig } from 'eslint/config'
import { configs as tsConfigs } from 'typescript-eslint'

export default defineConfig(
  eslint.configs.recommended,
  tsConfigs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    ignores: ['dist/**', '.turbo/**'],
    languageOptions: { globals: { Bun: 'readonly' } },
  },
)
