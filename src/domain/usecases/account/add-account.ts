import { CheckAccountByEmail } from '@/domain/contracts/database/account'
import { HashGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountByEmail, hash: HashGenerator) => AddAccount
type Input = { firstName: string, lastName: string, phone: string, birth: Date, email: string, password: string }
export type AddAccount = (input: Input) => Promise<void>

export const addAccountUseCase: Setup = (accountRepository, hash) => async ({ email, password }) => {
  const emailExists = await accountRepository.checkByEmail(email)
  if (emailExists) throw new FieldInUseError('email')
  await hash.generate({ plaintext: password })
}
