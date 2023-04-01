import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: LoadAnimeById) => DeleteAnime
type Input = { id: string }
export type DeleteAnime = (input: Input) => Promise<void>

export const DeleteAnimeUseCase: Setup = (animeRepository) => async ({ id }) => {
  const anime = await animeRepository.loadById({ id })
  if (!anime) throw new NotFoundError('id')
}
