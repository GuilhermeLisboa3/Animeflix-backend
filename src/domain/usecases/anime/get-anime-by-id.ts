import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: LoadAnimeById) => GetAnimeById
type Input = { id: string }
type Output = { id: number, name: string, thumbnailUrl: string, synopsis: string }
export type GetAnimeById = (input: Input) => Promise<Output>

export const GetAnimeByIdUseCase: Setup = (animeRepository) => async ({ id }) => {
  const anime = await animeRepository.loadById({ id })
  if (!anime) throw new NotFoundError('id')
  return anime
}
