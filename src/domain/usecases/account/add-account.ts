import { CheckAccountByEmail } from '@/domain/contracts/database/account'

type Setup = (accountRepository: CheckAccountByEmail) => AddAccount
type Input = { firstName: string, lastName: string, phone: string, birth: Date, email: string, password: string }
export type AddAccount = (input: Input) => Promise<void>

export const addAccountUseCase: Setup = (accountRepository) => async ({ email }) => {
  await accountRepository.checkByEmail(email)
}
