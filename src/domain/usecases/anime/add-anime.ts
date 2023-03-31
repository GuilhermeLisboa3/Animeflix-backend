import { CheckAnime } from '@/domain/contracts/database/anime'
import { CheckCategoryById } from '@/domain/contracts/database/category'
import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

type Setup = (
  animeRepository: CheckAnime,
  categoryRepository: CheckCategoryById,
  uuid: UUIDGenerator,
  fileStorage: UploadFile
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
  if (file) await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
}
