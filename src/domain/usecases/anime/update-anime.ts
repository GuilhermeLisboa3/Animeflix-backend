import { LoadAnimeById, UpdateAnimeRepository } from '@/domain/contracts/database/anime'
import { CheckCategoryById } from '@/domain/contracts/database/category'
import { DeleteFile, UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: LoadAnimeById & UpdateAnimeRepository, fileStorage: DeleteFile & UploadFile, uuid: UUIDGenerator, categoryRepository: CheckCategoryById) => UpdateAnime
type Input = { id: string, name?: string, categoryId?: number, file?: { buffer: Buffer, mimeType: string }, synopsis?: string, featured?: boolean }
export type UpdateAnime = (input: Input) => Promise<void>

export const UpdateAnimeUseCase: Setup = (animeRepository, fileStorage, uuid, categoryRepository) => async ({ id, file, categoryId, featured, name, synopsis }) => {
  const anime = await animeRepository.loadById({ id })
  if (!anime) throw new NotFoundError('id')
  let picture: string | undefined
  if (file) {
    if (anime.thumbnailUrl) await fileStorage.delete({ fileName: anime.thumbnailUrl })
    const key = uuid.generate()
    picture = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
  }
  if (categoryId) {
    const category = await categoryRepository.checkById({ id: categoryId })
    if (!category) throw new NotFoundError('categoryId')
  }
  await animeRepository.update({ id, thumbnailUrl: picture, categoryId, featured, name, synopsis })
}
