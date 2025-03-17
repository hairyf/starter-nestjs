import type { Package } from '@manypkg/get-packages'
import type { ClientProviderOptions } from '@nestjs/microservices'
import { getPackages, getPackagesSync } from '@manypkg/get-packages'
import { Transport } from '@nestjs/microservices'
import path from 'pathe'

interface Microservice {
  name: string
  relative: string
  absolute: string
  host: string
  port: number
  depends: string[]
  options: ClientProviderOptions
}

function parsePackages(packages: Package[]) {
  const services: Microservice[] = []
  for (const pack of packages) {
    const absolute = pack.dir.replace(/\\/g, '/')
    const relative = pack.relativeDir.replace(/\\/g, '/')
    const json = pack.packageJson as any
    if (!relative.startsWith('packages/apps') || relative.startsWith('packages/apps/gateway'))
      continue

    services.push({
      name: json.name,
      relative,
      absolute,
      host: json.service.host,
      port: json.service.port,
      depends: json.depends ?? [],
      options: {
        name: json.name,
        transport: Transport.TCP,
        options: {
          host: json.service.host,
          port: json.service.port,
        },
      },
    })
  }
  return services
}

export async function getMicroservicesAsync() {
  const { packages } = await getPackages(path.join(__dirname, '..'))
  return parsePackages(packages)
}

export function getMicroservices() {
  const { packages } = getPackagesSync(path.join(__dirname, '..'))
  return parsePackages(packages)
}

export async function getMicroserviceAsync(name: string) {
  const services = await getMicroservicesAsync()
  return services.find(service => service.name === name)
}

export function getMicroservice(name: string) {
  return getMicroservices().find(service => service.name === name)
}
