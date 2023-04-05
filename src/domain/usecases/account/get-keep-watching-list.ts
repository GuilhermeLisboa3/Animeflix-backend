import { LoadWatchTimeByUserId, LoadWatchTime } from '@/domain/contracts/database/watch-time'
import { LoadEpisodeById } from '@/domain/contracts/database/episode'
import { filterLastEpisodesByAnime } from '@/domain/entities'
import { LoadAnimeById } from '@/domain/contracts/database/anime'

type Setup = (watchTimeRepository: LoadWatchTimeByUserId & LoadWatchTime, episodeRepository: LoadEpisodeById, animeRepository: LoadAnimeById) => KeepWatchingList
type Input = { id: string }
export type KeepWatchingList = (input: Input) => Promise<void>

export const GetKeepWatchingListUseCase: Setup = (watchTimeRepository, episodeRepository, animeRepository) => async ({ id }) => {
  const listEpisodesId = await watchTimeRepository.loadByUserId({ userId: id })
  if (listEpisodesId.length > 0) {
    const listEpisodes = []
    for (const episodeId of listEpisodesId) {
      const episode = await episodeRepository.loadById({ id: episodeId.toString() })
      if (episode) listEpisodes.push(episode)
    }
    const listLastEpisodesByAnime = filterLastEpisodesByAnime(listEpisodes)
    for (const lastEpisodes of listLastEpisodesByAnime) {
      await animeRepository.loadById({ id: lastEpisodes.id.toString() })
      await watchTimeRepository.load({ userId: id, episodeId: lastEpisodes.id.toString() })
    }
  }
}
