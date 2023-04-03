import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { LoadEpisodeByAnimeId } from '@/domain/contracts/database/episode'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: LoadAnimeById, episodeRepository: LoadEpisodeByAnimeId) => GetAnimeById
type Input = { id: string }
type Output = { id: number, name: string, thumbnailUrl: string, synopsis: string, episodes: Array<{ id: number, name: string, videoUrl: string, synopsis: string, secondsLong: number, order: number }> }
export type GetAnimeById = (input: Input) => Promise<Output>

export const GetAnimeByIdUseCase: Setup = (animeRepository, episodeRepository) => async ({ id }) => {
  const anime = await animeRepository.loadById({ id })
  if (!anime) throw new NotFoundError('id')
  const episodes = await episodeRepository.loadByAnimeId({ animeId: id })
  return {
    id: anime.id,
    name: anime.name,
    thumbnailUrl: anime.thumbnailUrl,
    synopsis: anime.synopsis,
    episodes
  }
}
