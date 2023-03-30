import { LoadAccountByEmail } from '@/domain/contracts/database/account'
import { HashComparer } from '@/domain/contracts/gateways'
import { AuthenticationError } from '@/domain/errors'

type Setup = (accountRepository: LoadAccountByEmail, hashCompare: HashComparer) => Authentication
type Input = { email: string, password: string }
export type Authentication = (input: Input) => Promise<void>

export const AuthenticationUseCase: Setup = (accountRepository, hashCompare) => async ({ email, password }) => {
  const account = await accountRepository.loadByEmail(email)
  if (!account) throw new AuthenticationError()
  const isValid = await hashCompare.comparer({ plaintext: password, digest: account.password })
  if (!isValid) throw new AuthenticationError()
}
