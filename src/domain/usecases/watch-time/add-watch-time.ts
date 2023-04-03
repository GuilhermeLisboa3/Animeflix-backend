import { CheckAccountById } from '@/domain/contracts/database/account'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById) => AddWatchTime
type Input = { accountId: number, episodeId: number, seconds: number }
export type AddWatchTime = (input: Input) => Promise<void>

export const AddWatchTimeUseCase: Setup = (accountRepository) => async ({ accountId, episodeId, seconds }) => {
  const existAccount = await accountRepository.checkById({ id: accountId })
  if (!existAccount) throw new NotFoundError('accountId')
}
