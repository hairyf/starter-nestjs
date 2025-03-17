import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import databases from '../dbs.config'
import packageJSON from '../package.json'

export async function sync() {
  const exports: any = {}
  databases.forEach(db => Object.assign(exports, {
    [`./${db.name}/*`]: `./src/generated/${db.name}/*`,
    [`./${db.name}`]: {
      types: `./src/generated/${db.name}/index.d.ts`,
      import: `./src/generated/${db.name}/index.mjs`,
      require: `./src/generated/${db.name}/index.js`,
    },
  }))
  const codes = [
    ...databases.map(db => `import ${db.name}Module from './generated/${db.name}'`),
    '',
    ...databases.map(db => `export const ${db.name} = new ${db.name}Module.PrismaClient()`),
  ]
  await fs.ensureDir(path.join(process.cwd(), './src'))
  await fs.writeFile(path.join(process.cwd(), './src/index.ts'), codes.join('\n'))
  await fs.writeJSON(path.join(process.cwd(), './package.json'), {
    ...packageJSON,
    main: 'src/index.ts',
    exports: {
      '.': {
        import: './src/index.ts',
        require: './src/index.ts',
      },
      ...exports,
    },
  }, { spaces: 2 })
}
