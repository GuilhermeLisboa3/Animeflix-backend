import { LoadEpisodeById, CheckEpisodeByOrder } from '@/domain/contracts/database/episode'
import { DeleteFile } from '@/domain/contracts/gateways'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

type Setup = (episodeRepository: LoadEpisodeById & CheckEpisodeByOrder, fileStorage: DeleteFile) => UpdateEpisode
type Input = { id: string, animeId?: number, name?: string, synopsis?: string, secondsLong?: number, order?: number, file?: { buffer: Buffer, mimeType: string } }
export type UpdateEpisode = (input: Input) => Promise<void>

export const UpdateEpisodeUseCase: Setup = (episodeRepository, fileStorage) => async ({ id, animeId, order, file, name, synopsis, secondsLong }) => {
  const episode = await episodeRepository.loadById({ id })
  if (!episode) throw new NotFoundError('id')
  if (order) {
    const existsEpisode = await episodeRepository.checkByOrder({ order })
    if (existsEpisode) throw new FieldInUseError('order')
  }
  if (file) {
    if (episode.videoUrl) await fileStorage.delete({ fileName: episode.videoUrl })
  }
}
