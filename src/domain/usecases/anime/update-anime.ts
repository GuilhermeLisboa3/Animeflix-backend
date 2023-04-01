import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: LoadAnimeById) => UpdateAnime
type Input = { id: string, name?: string, categoryId?: number, file?: { buffer: Buffer, mimeType: string }, synopsis?: string, featured?: boolean }
export type UpdateAnime = (input: Input) => Promise<void>

export const UpdateAnimeUseCase: Setup = (animeRepository) => async ({ id, file, categoryId, featured, name, synopsis }) => {
  const anime = await animeRepository.loadById({ id })
  if (!anime) throw new NotFoundError('id')
}
