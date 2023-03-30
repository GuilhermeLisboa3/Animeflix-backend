import { LoadAccountByEmail } from '@/domain/contracts/database/account'
import { AuthenticationError } from '@/domain/errors'

type Setup = (accountRepository: LoadAccountByEmail) => Authentication
type Input = { email: string, password: string }
export type Authentication = (input: Input) => Promise<void>

export const AuthenticationUseCase: Setup = (accountRepository) => async ({ email, password }) => {
  const account = await accountRepository.loadByEmail(email)
  if (!account) throw new AuthenticationError()
}
