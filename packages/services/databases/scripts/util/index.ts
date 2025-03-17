import process from 'node:process'
import { execa } from 'execa'

export async function exec(db: any, command: string) {
  const options: any = {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: `${process.env.DATABASE_URL}/${db.database}`,
      DATABASE_OUTPUT: `../src/generated/${db.name}`,
    },
  }
  await execa(options)`${command} --schema ${db.schema}`
}
