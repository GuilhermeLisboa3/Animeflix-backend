import { HashGenerator } from '@/domain/contracts/gateways'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashGenerator {
  constructor (private readonly salt: number) {}

  async generate ({ plaintext }: HashGenerator.Input): Promise<HashGenerator.Output> {
    return await bcrypt.hash(plaintext, this.salt)
  }
}
