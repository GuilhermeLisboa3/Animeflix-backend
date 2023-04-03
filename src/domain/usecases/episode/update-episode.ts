import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { LoadEpisodeById, CheckEpisodeByOrder } from '@/domain/contracts/database/episode'
import { DeleteFile, UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

type Setup = (episodeRepository: LoadEpisodeById & CheckEpisodeByOrder, fileStorage: DeleteFile & UploadFile, uuid: UUIDGenerator, animeRepository: CheckAnimeById) => UpdateEpisode
type Input = { id: string, animeId?: number, name?: string, synopsis?: string, secondsLong?: number, order?: number, file?: { buffer: Buffer, mimeType: string } }
export type UpdateEpisode = (input: Input) => Promise<void>

export const UpdateEpisodeUseCase: Setup = (episodeRepository, fileStorage, uuid, animeRepository) => async ({ id, animeId, order, file, name, synopsis, secondsLong }) => {
  const episode = await episodeRepository.loadById({ id })
  if (!episode) throw new NotFoundError('id')
  if (order) {
    const existsEpisode = await episodeRepository.checkByOrder({ order })
    if (existsEpisode) throw new FieldInUseError('order')
  }
  if (file) {
    if (episode.videoUrl) await fileStorage.delete({ fileName: episode.videoUrl })
    const key = uuid.generate()
    await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
  }
  if (animeId) {
    await animeRepository.checkById({ id: animeId })
  }
}
