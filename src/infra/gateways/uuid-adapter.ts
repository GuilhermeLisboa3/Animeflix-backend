import { UUIDGenerator } from '@/domain/contracts/gateways'

import { v4 as uuidV4 } from 'uuid'

export class UUIDAdapter implements UUIDGenerator {
  generate (): string {
    return uuidV4()
  }
}
