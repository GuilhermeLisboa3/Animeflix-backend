import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckEpisodeById } from '@/domain/contracts/database/episode'
import { LoadWatchTime } from '@/domain/contracts/database/watch-time'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, episodeRepository: CheckEpisodeById, watchTimeRepository: LoadWatchTime) => GetWatchTime
type Input = { accountId: string, episodeId: string }
type Output = { seconds: number } | null
export type GetWatchTime = (input: Input) => Promise<Output>

export const GetWatchTimeUseCase: Setup = (accountRepository, episodeRepository, watchTimeRepository) => async ({ accountId, episodeId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
  const existEpisode = await episodeRepository.checkById({ id: episodeId })
  if (!existEpisode) throw new NotFoundError('episodeId')
  const watchTime = await watchTimeRepository.load({ userId: accountId, episodeId })
  return watchTime !== null ? { seconds: watchTime.seconds } : null
}
