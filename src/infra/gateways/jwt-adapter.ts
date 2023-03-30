import { TokenGenerator, TokenValidator } from '@/domain/contracts/gateways'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return jwt.sign({ key }, this.secret, { expiresIn: '1d' })
  }

  async validate ({ token }: TokenValidator.Input): Promise<void> {
    jwt.verify(token, this.secret) as any
  }
}
