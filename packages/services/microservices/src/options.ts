import { ClientProxyFactory } from '@nestjs/microservices'
import { getMicroservice, getMicroservices } from './getters'

export function microservices() {
  return getMicroservices().map(service => service.options)
}

export function microservice(name: string) {
  return getMicroservice(name)!.options
}

export function client(name: string) {
  return ClientProxyFactory.create(microservice(name))
}

export function clients(includes: string[]) {
  return microservices()
    .filter(service => includes.includes(service.name as string))
    .map(service => ClientProxyFactory.create(service))
}
