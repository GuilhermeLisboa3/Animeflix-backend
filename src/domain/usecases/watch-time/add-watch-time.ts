import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckEpisodeById } from '@/domain/contracts/database/episode'
import { SaveWatchTime } from '@/domain/contracts/database/watch-time'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, episodeRepository: CheckEpisodeById, watchTimeRepository: SaveWatchTime) => AddWatchTime
type Input = { accountId: number, episodeId: number, seconds: number }
export type AddWatchTime = (input: Input) => Promise<void>

export const AddWatchTimeUseCase: Setup = (accountRepository, episodeRepository, watchTimeRepository) => async ({ accountId, episodeId, seconds }) => {
  const existAccount = await accountRepository.checkById({ id: accountId })
  if (!existAccount) throw new NotFoundError('accountId')
  const existEpisode = await episodeRepository.checkById({ id: episodeId.toString() })
  if (!existEpisode) throw new NotFoundError('episodeId')
  await watchTimeRepository.save({ userId: accountId, episodeId, seconds })
}
