import { TokenValidator } from '@/domain/contracts/gateways'
import { CheckAccountRole } from '@/domain/contracts/database/account'
import { AuthenticationError } from '@/domain/errors'

type Setup = (token: TokenValidator, accountRepository: CheckAccountRole) => Authorize
type Input = { accessToken: string, role?: string }
export type Authorize = (input: Input) => Promise<void>

export const AuthorizeUseCase: Setup = (token, accountRepository) => async ({ accessToken, role }) => {
  let accountId: string
  try {
    accountId = await token.validate({ token: accessToken })
  } catch {
    throw new AuthenticationError()
  }
  await accountRepository.checkRole({ accountId, role })
}
