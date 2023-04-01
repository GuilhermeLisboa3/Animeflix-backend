import { LoadAnimeById } from '@/domain/contracts/database/anime'

type Setup = (animeRepository: LoadAnimeById) => UpdateAnime
type Input = { id: string, name?: string, categoryId?: number, file?: { buffer: Buffer, mimeType: string }, synopsis?: string, featured?: boolean }
export type UpdateAnime = (input: Input) => Promise<void>

export const UpdateAnimeUseCase: Setup = (animeRepository) => async ({ id, file, categoryId, featured, name, synopsis }) => {
  await animeRepository.loadById({ id })
}
