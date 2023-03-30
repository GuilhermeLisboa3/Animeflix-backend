import { LoadAccountByEmail } from '@/domain/contracts/database/account'

type Setup = (accountRepository: LoadAccountByEmail) => Authentication
type Input = { email: string, password: string }
export type Authentication = (input: Input) => Promise<void>

export const AuthenticationUseCase: Setup = (accountRepository) => async ({ email, password }) => {
  await accountRepository.loadByEmail(email)
}
