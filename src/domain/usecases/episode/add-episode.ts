import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { CheckEpisodeByOrder } from '@/domain/contracts/database/episode'
import { UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: CheckAnimeById, episodeRepository: CheckEpisodeByOrder, uuid: UUIDGenerator, fileStorage: UploadFile) => AddEpisode
type Input = { animeId: number, name: string, synopsis: string, secondsLong?: number, order: number, file?: { buffer: Buffer, mimeType: string } }
export type AddEpisode = (input: Input) => Promise<void>

export const AddEpisodeUseCase: Setup = (animeRepository, episodeRepository, uuid, fileStorage) => async ({ animeId, order, file, name, synopsis, secondsLong }) => {
  const animeExists = await animeRepository.checkById({ id: animeId })
  if (!animeExists) throw new NotFoundError('animeId')
  const episodeExists = await episodeRepository.checkByOrder({ order })
  if (episodeExists) throw new FieldInUseError('order')
  const key = uuid.generate()
  if (file) await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
}
