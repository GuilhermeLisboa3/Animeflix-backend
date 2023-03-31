import { LoadAccountById } from '@/domain/contracts/database/account'
import { HashComparer, HashGenerator } from '@/domain/contracts/gateways'
import { CompareFieldsError } from '@/domain/errors'

type Setup = (accountRepository: LoadAccountById, hash: HashComparer & HashGenerator) => UpdateAccount
type Input = { accountId: string, currentPassword?: string, newPassword?: string, firstName?: string, lastName?: string, phone?: string, birth?: Date, email?: string }
export type UpdateAccount = (input: Input) => Promise<void>

export const UpdateAccountUseCase: Setup = (accountRepository, hash) => async ({ accountId, currentPassword, newPassword, firstName, lastName, email, birth, phone }) => {
  if (currentPassword && newPassword) {
    const account = await accountRepository.loadById({ id: accountId })
    if (account) {
      const isValid = await hash.comparer({ plaintext: currentPassword, digest: account.password })
      if (!isValid) throw new CompareFieldsError('currentPassword', 'password')
      await hash.generate({ plaintext: newPassword })
    }
  }
}
