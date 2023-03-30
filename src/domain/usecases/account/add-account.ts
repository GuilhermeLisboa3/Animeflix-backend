import { CheckAccountByEmail } from '@/domain/contracts/database/account'
import { FieldInUseError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountByEmail) => AddAccount
type Input = { firstName: string, lastName: string, phone: string, birth: Date, email: string, password: string }
export type AddAccount = (input: Input) => Promise<void>

export const addAccountUseCase: Setup = (accountRepository) => async ({ email }) => {
  const emailExists = await accountRepository.checkByEmail(email)
  if (emailExists) throw new FieldInUseError('email')
}
