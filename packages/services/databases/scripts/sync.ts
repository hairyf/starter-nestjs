import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import databases from '../dbs.config'
import packageJSON from '../package.json'

export async function sync() {
  await writeExports()
  await writeGenerates()
  await writeIndex()
}

async function writeExports() {
  const data: any = {}
  databases.forEach(db => Object.assign(data, {
    [`./${db.name}/*`]: `./src/generated/${db.name}/*`,
    [`./${db.name}`]: {
      types: `./src/generated/${db.name}/index.d.ts`,
      import: `./src/generated/${db.name}/index.mjs`,
      require: `./src/generated/${db.name}/index.js`,
    },
  }))
  await fs.writeJSON(path.join(process.cwd(), './package.json'), {
    ...packageJSON,
    main: 'src/index.ts',
    exports: {
      '.': {
        import: './src/index.ts',
        require: './src/index.ts',
      },
      ...data,
    },
  }, { spaces: 2 })
}

async function writeIndex() {
  const codes = [
    ...databases.map(db => `import { PrismaClient as PrismaClient${db.name} } from './generated/${db.name}'`),
    '',
    ...databases.map(db => `export const ${db.name} = new PrismaClient${db.name}()`),
  ]
  await fs.ensureDir(path.join(process.cwd(), './src'))
  await fs.writeFile(path.join(process.cwd(), './src/index.ts'), codes.join('\n'))
}

async function writeGenerates() {
  for (const database of databases) {
    const envAlias = `DATABASE_URL_${database.name}`

    const relative = `./src/generated/${database.name}/index.js`
    const filepath = path.join(process.cwd(), relative)

    let file = await fs.readFile(filepath, 'utf-8')
    file = file.replace(/DATABASE_URL/g, envAlias)
    file = `process.env["${envAlias}"] = \`\${process.env.DATABASE_URL}/${database.database}\`\n${file}`
    await fs.writeFile(filepath, file)
  }
}
