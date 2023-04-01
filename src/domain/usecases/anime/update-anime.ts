import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { DeleteFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: LoadAnimeById, fileStorage: DeleteFile, uuid: UUIDGenerator) => UpdateAnime
type Input = { id: string, name?: string, categoryId?: number, file?: { buffer: Buffer, mimeType: string }, synopsis?: string, featured?: boolean }
export type UpdateAnime = (input: Input) => Promise<void>

export const UpdateAnimeUseCase: Setup = (animeRepository, fileStorage, uuid) => async ({ id, file, categoryId, featured, name, synopsis }) => {
  const anime = await animeRepository.loadById({ id })
  if (!anime) throw new NotFoundError('id')
  if (file) {
    if (anime.thumbnailUrl) await fileStorage.delete({ fileName: anime.thumbnailUrl })
    uuid.generate()
  }
}
