import { TokenValidator } from '@/domain/contracts/gateways'

type Setup = (token: TokenValidator) => Authorize
type Input = { accessToken: string, role?: string }
export type Authorize = (input: Input) => Promise<void>

export const AuthorizeUseCase: Setup = (token) => async ({ accessToken, role }) => {
  await token.validate({ token: accessToken })
}
