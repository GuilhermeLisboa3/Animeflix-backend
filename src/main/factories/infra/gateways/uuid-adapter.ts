import { UUIDAdapter } from '@/infra/gateways'

export const makeUUIDAdapter = (): UUIDAdapter => new UUIDAdapter()
