import { CheckAccountByEmail, CreateAccount } from '@/domain/contracts/database/account'
import { HashGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountByEmail & CreateAccount, hash: HashGenerator) => AddAccount
type Input = { firstName: string, lastName: string, phone: string, birth: Date, email: string, password: string }
export type AddAccount = (input: Input) => Promise<void>

export const addAccountUseCase: Setup = (accountRepository, hash) => async ({ email, password, birth, firstName, lastName, phone }) => {
  const emailExists = await accountRepository.checkByEmail(email)
  if (emailExists) throw new FieldInUseError('email')
  const hashPassword = await hash.generate({ plaintext: password })
  await accountRepository.create({ email, password: hashPassword, birth, firstName, lastName, phone })
}
