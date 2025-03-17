import databases from '../dbs.config'
import { sync } from './sync'
import { exec } from './util'

async function main() {
  const processes = databases.map(db => exec(db, `prisma studio`))
  await Promise.all(processes)
  await sync()
}

main()
