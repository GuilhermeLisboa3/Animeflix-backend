import { LoadWatchTimeByUserId, LoadWatchTime } from '@/domain/contracts/database/watch-time'
import { LoadEpisodeById } from '@/domain/contracts/database/episode'
import { filterLastEpisodesByAnime } from '@/domain/entities'
import { LoadAnimeById } from '@/domain/contracts/database/anime'

type Setup = (watchTimeRepository: LoadWatchTimeByUserId & LoadWatchTime, episodeRepository: LoadEpisodeById, animeRepository: LoadAnimeById) => KeepWatchingList
type Input = { id: string }
type Output = Array<{
  id: number
  name: string
  videoUrl: string | null
  synopsis: string
  secondsLong: number | null
  order: number
  animeId: number
  watchTime: { seconds: number, userId: number, episodeId: number } | null
  anime: { id: number, name: string, thumbnailUrl: string, synopsis: string, featured: boolean } | undefined
}> | undefined
export type KeepWatchingList = (input: Input) => Promise<Output>

export const GetKeepWatchingListUseCase: Setup = (watchTimeRepository, episodeRepository, animeRepository) => async ({ id }) => {
  const listEpisodesId = await watchTimeRepository.loadByUserId({ userId: id })
  if (listEpisodesId.length > 0) {
    let listEpisodes = []
    for (const episodeId of listEpisodesId) {
      const episode = await episodeRepository.loadById({ id: episodeId.toString() })
      if (episode) listEpisodes.push(episode)
    }
    const listLastEpisodesByAnime = filterLastEpisodesByAnime(listEpisodes)
    listEpisodes = []
    for (const lastEpisodes of listLastEpisodesByAnime) {
      const anime = await animeRepository.loadById({ id: lastEpisodes.animeId.toString() })
      const watchTime = await watchTimeRepository.load({ userId: id, episodeId: lastEpisodes.id.toString() })
      listEpisodes.push({ ...lastEpisodes, anime, watchTime })
    }
    listEpisodes.sort((a, b) => {
      if (a.watchTime && b.watchTime && a.watchTime.updatedAt && b.watchTime.updatedAt && a.watchTime.updatedAt < b.watchTime.updatedAt) {
        return 1
      } else return -1
    })
    return listEpisodes
  }
  return undefined
}
