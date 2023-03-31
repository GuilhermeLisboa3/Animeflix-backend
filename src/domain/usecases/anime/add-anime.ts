import { CheckAnime, CreateAnime } from '@/domain/contracts/database/anime'
import { CheckCategoryById } from '@/domain/contracts/database/category'
import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

type Setup = (
  animeRepository: CheckAnime & CreateAnime,
  categoryRepository: CheckCategoryById,
  uuid: UUIDGenerator,
  fileStorage: UploadFile & DeleteFile
) => AddAnime
type Input = { name: string, categoryId: number, file?: { buffer: Buffer, mimeType: string }, synopsis: string, featured?: boolean }
export type AddAnime = (input: Input) => Promise<void>

export const AddAnimeUseCase: Setup = (animeRepository, categoryRepository, uuid, fileStorage) => async ({ name, categoryId, file, synopsis, featured }) => {
  const nameLowerCase = name.toLocaleLowerCase()
  const animeExists = await animeRepository.check({ name: nameLowerCase })
  if (animeExists) throw new FieldInUseError('name')
  const categoryExists = await categoryRepository.checkById({ id: categoryId })
  if (!categoryExists) throw new NotFoundError('categoryId')
  const key = uuid.generate()
  let picture: string | undefined
  if (file) picture = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
  try {
    await animeRepository.create({ name: nameLowerCase, synopsis, featured, thumbnailUrl: picture, categoryId })
  } catch (error) {
    if (file) await fileStorage.delete({ fileName: `${key}.${file.mimeType.split('/')[1]}` })
    throw error
  }
}
