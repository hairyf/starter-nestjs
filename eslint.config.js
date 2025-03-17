// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  { type: 'lib' },
  { rules: {
    'import/no-mutable-exports': 'off',
    'ts/explicit-function-return-type': 'off',
  } },
)
