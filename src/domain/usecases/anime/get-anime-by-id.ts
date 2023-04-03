import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { LoadEpisodeByAnimeId } from '@/domain/contracts/database/episode'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: LoadAnimeById, episodeRepository: LoadEpisodeByAnimeId) => GetAnimeById
type Input = { id: string }
type Output = { id: number, name: string, thumbnailUrl: string, synopsis: string }
export type GetAnimeById = (input: Input) => Promise<Output>

export const GetAnimeByIdUseCase: Setup = (animeRepository, episodeRepository) => async ({ id }) => {
  const anime = await animeRepository.loadById({ id })
  if (!anime) throw new NotFoundError('id')
  await episodeRepository.loadByAnimeId({ animeId: id })
  return anime
}
