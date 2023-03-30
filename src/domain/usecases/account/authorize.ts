import { TokenValidator } from '@/domain/contracts/gateways'
import { AuthenticationError } from '@/domain/errors'

type Setup = (token: TokenValidator) => Authorize
type Input = { accessToken: string, role?: string }
export type Authorize = (input: Input) => Promise<void>

export const AuthorizeUseCase: Setup = (token) => async ({ accessToken, role }) => {
  try {
    await token.validate({ token: accessToken })
  } catch {
    throw new AuthenticationError()
  }
}
