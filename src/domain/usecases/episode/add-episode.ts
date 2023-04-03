import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { CheckEpisodeByOrder, CreateEpisode } from '@/domain/contracts/database/episode'
import { UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: CheckAnimeById, episodeRepository: CheckEpisodeByOrder & CreateEpisode, uuid: UUIDGenerator, fileStorage: UploadFile) => AddEpisode
type Input = { animeId: number, name: string, synopsis: string, secondsLong?: number, order: number, file?: { buffer: Buffer, mimeType: string } }
export type AddEpisode = (input: Input) => Promise<void>

export const AddEpisodeUseCase: Setup = (animeRepository, episodeRepository, uuid, fileStorage) => async ({ animeId, order, file, name, synopsis, secondsLong }) => {
  const animeExists = await animeRepository.checkById({ id: animeId })
  if (!animeExists) throw new NotFoundError('animeId')
  const episodeExists = await episodeRepository.checkByOrder({ order })
  if (episodeExists) throw new FieldInUseError('order')
  const key = uuid.generate()
  let videoUrl: string | undefined
  if (file) videoUrl = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
  await episodeRepository.create({ animeId, order, videoUrl, name, synopsis, secondsLong })
}
