import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { LoadEpisodeById, CheckEpisodeByOrder, UpdateEpisodeRepository } from '@/domain/contracts/database/episode'
import { DeleteFile, UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

type Setup = (episodeRepository: LoadEpisodeById & CheckEpisodeByOrder & UpdateEpisodeRepository, fileStorage: DeleteFile & UploadFile, uuid: UUIDGenerator, animeRepository: CheckAnimeById) => UpdateEpisode
type Input = { id: string, animeId?: number, name?: string, synopsis?: string, secondsLong?: number, order?: number, file?: { buffer: Buffer, mimeType: string } }
export type UpdateEpisode = (input: Input) => Promise<void>

export const UpdateEpisodeUseCase: Setup = (episodeRepository, fileStorage, uuid, animeRepository) => async ({ id, animeId, order, file, name, synopsis, secondsLong }) => {
  const episode = await episodeRepository.loadById({ id })
  if (!episode) throw new NotFoundError('id')
  let videoUrl: string | undefined
  if (file) {
    if (episode.videoUrl) await fileStorage.delete({ fileName: episode.videoUrl })
    const key = uuid.generate()
    videoUrl = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
  }
  let existsEpisode: boolean = false
  if (animeId) {
    const existsAnime = await animeRepository.checkById({ id: animeId })
    if (!existsAnime) throw new NotFoundError('animeId')
    if (!order) {
      existsEpisode = await episodeRepository.checkByOrder({ order: episode.order, animeId: Number(animeId) })
    }
    if (order) {
      existsEpisode = await episodeRepository.checkByOrder({ order, animeId: Number(animeId) })
    }
  }
  if (order && !animeId) {
    existsEpisode = await episodeRepository.checkByOrder({ order, animeId: Number(episode.animeId) })
  }
  if (existsEpisode) throw new FieldInUseError('order')
  await episodeRepository.update({ id, animeId, order, videoUrl, name, synopsis, secondsLong })
}
