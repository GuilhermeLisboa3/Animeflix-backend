import { TokenGenerator, TokenValidator } from '@/domain/contracts/gateways'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator, TokenValidator {
  constructor (private readonly secret: string) {}

  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return jwt.sign({ key }, this.secret, { expiresIn: '1d' })
  }

  async validate ({ token }: TokenValidator.Input): Promise<TokenValidator.Output> {
    const { key } = jwt.verify(token, this.secret) as any
    return key
  }
}
