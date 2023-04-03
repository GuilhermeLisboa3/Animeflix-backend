import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckEpisodeById } from '@/domain/contracts/database/episode'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, episodeRepository: CheckEpisodeById) => GetWatchTime
type Input = { accountId: string, episodeId: string }
export type GetWatchTime = (input: Input) => Promise<void>

export const GetWatchTimeUseCase: Setup = (accountRepository, episodeRepository) => async ({ accountId, episodeId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
  const existEpisode = await episodeRepository.checkById({ id: episodeId })
  if (!existEpisode) throw new NotFoundError('episodeId')
}
