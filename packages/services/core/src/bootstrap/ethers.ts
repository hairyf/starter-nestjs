import type { FetchRequest } from 'ethers'
import process from 'node:process'
import { httpsOverHttp } from 'tunnel'

export function withEthersProxy(request: typeof FetchRequest) {
  if (!(process.env.AGENT_HOST && process.env.AGENT_PORT))
    return
  const agent = httpsOverHttp({
    proxy: {
      host: process.env.AGENT_HOST,
      port: Number(process.env.AGENT_PORT),
    },
  })

  // register as an ethers agent
  const fetchRequest = request.createGetUrlFunc({ agent })
  request.registerGetUrl(fetchRequest)
}
