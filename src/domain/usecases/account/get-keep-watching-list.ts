import { LoadWatchTimeByUserId } from '@/domain/contracts/database/watch-time'
import { LoadEpisodeById } from '@/domain/contracts/database/episode'

type Setup = (watchTimeRepository: LoadWatchTimeByUserId, episodeRepository: LoadEpisodeById) => KeepWatchingList
type Input = { id: string }
export type KeepWatchingList = (input: Input) => Promise<void>

export const GetKeepWatchingListUseCase: Setup = (watchTimeRepository, episodeRepository) => async ({ id }) => {
  const listEpisodesId = await watchTimeRepository.loadByUserId({ userId: id })
  if (listEpisodesId.length > 0) {
    for (const episodeId of listEpisodesId) {
      await episodeRepository.loadById({ id: episodeId.toString() })
    }
  }
}
