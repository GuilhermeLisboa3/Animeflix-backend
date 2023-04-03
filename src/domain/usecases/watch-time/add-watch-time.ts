import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckEpisodeById } from '@/domain/contracts/database/episode'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, episodeRepository: CheckEpisodeById) => AddWatchTime
type Input = { accountId: number, episodeId: number, seconds: number }
export type AddWatchTime = (input: Input) => Promise<void>

export const AddWatchTimeUseCase: Setup = (accountRepository, episodeRepository) => async ({ accountId, episodeId, seconds }) => {
  const existAccount = await accountRepository.checkById({ id: accountId })
  if (!existAccount) throw new NotFoundError('accountId')
  await episodeRepository.checkById({ id: episodeId.toString() })
}
