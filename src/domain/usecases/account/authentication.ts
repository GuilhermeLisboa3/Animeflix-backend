import { LoadAccountByEmail } from '@/domain/contracts/database/account'
import { HashComparer, TokenGenerator } from '@/domain/contracts/gateways'
import { AuthenticationError } from '@/domain/errors'

type Setup = (accountRepository: LoadAccountByEmail, hashCompare: HashComparer, token: TokenGenerator) => Authentication
type Input = { email: string, password: string }
type Output = { accessToken: string }
export type Authentication = (input: Input) => Promise<Output>

export const AuthenticationUseCase: Setup = (accountRepository, hashCompare, token) => async ({ email, password }) => {
  const account = await accountRepository.loadByEmail(email)
  if (!account) throw new AuthenticationError()
  const isValid = await hashCompare.comparer({ plaintext: password, digest: account.password })
  if (!isValid) throw new AuthenticationError()
  const accessToken = await token.generate({ key: account.id })
  return { accessToken }
}
