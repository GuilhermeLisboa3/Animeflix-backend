import { LoadAccountById } from '@/domain/contracts/database/account'

type Setup = (accountRepository: LoadAccountById) => UpdateAccount
type Input = { accountId: string, currentPassword?: string, newPassword?: string, firstName?: string, lastName?: string, phone?: string, birth?: Date, email?: string }
export type UpdateAccount = (input: Input) => Promise<void>

export const UpdateAccountUseCase: Setup = (accountRepository) => async ({ accountId, currentPassword, newPassword, firstName, lastName, email, birth, phone }) => {
  if (currentPassword && newPassword) {
    await accountRepository.loadById({ id: accountId })
  }
}
