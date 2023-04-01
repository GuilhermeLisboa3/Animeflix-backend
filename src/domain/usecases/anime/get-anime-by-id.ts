import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: LoadAnimeById) => GetAnimeById
type Input = { id: string }
export type GetAnimeById = (input: Input) => Promise<void>

export const GetAnimeByIdUseCase: Setup = (animeRepository) => async ({ id }) => {
  const anime = await animeRepository.loadById({ id })
  if (!anime) throw new NotFoundError('id')
}
