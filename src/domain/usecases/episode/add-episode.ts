import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: CheckAnimeById) => AddEpisode
type Input = { animeId: number, name: string, synopsis: string, secondsLong?: number, order: number, file?: { buffer: Buffer, mimeType: string } }
export type AddEpisode = (input: Input) => Promise<void>

export const AddEpisodeUseCase: Setup = (animeRepository) => async ({ animeId, order, file, name, synopsis, secondsLong }) => {
  const animeExists = await animeRepository.checkById({ id: animeId })
  if (!animeExists) throw new NotFoundError('animeId')
}
