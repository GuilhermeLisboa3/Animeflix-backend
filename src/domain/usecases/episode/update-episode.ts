import { LoadEpisodeById } from '@/domain/contracts/database/episode'
import { NotFoundError } from '@/domain/errors'

type Setup = (episodeRepository: LoadEpisodeById) => UpdateEpisode
type Input = { id: string, animeId?: number, name?: string, synopsis?: string, secondsLong?: number, order?: number, file?: { buffer: Buffer, mimeType: string } }
export type UpdateEpisode = (input: Input) => Promise<void>

export const UpdateEpisodeUseCase: Setup = (episodeRepository) => async ({ id, animeId, order, file, name, synopsis, secondsLong }) => {
  const animeExists = await episodeRepository.loadById({ id })
  if (!animeExists) throw new NotFoundError('id')
}
