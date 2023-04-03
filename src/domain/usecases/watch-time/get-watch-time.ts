import { CheckAccountById } from '@/domain/contracts/database/account'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById) => GetWatchTime
type Input = { accountId: string, episodeId: string }
export type GetWatchTime = (input: Input) => Promise<void>

export const GetWatchTimeUseCase: Setup = (accountRepository) => async ({ accountId, episodeId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
}
