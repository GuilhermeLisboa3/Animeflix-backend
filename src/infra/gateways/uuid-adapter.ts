import { v4 as uuidV4 } from 'uuid'

export class UUIDAdapter {
  generate (): void {
    uuidV4()
  }
}
