// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  { type: 'lib', ignores: ['skills/**'] },
  { rules: {
    'ts/explicit-function-return-type': 'off',
    'ts/consistent-type-imports': 'off',
  } },
)
