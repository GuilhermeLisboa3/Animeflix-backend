import { CheckAnime } from '@/domain/contracts/database/anime'
import { CheckCategoryById } from '@/domain/contracts/database/category'
import { FieldInUseError } from '@/domain/errors'

type Setup = (animeRepository: CheckAnime, categoryRepository: CheckCategoryById) => AddAnime
type Input = { name: string, categoryId: number, file?: { buffer: Buffer, mimeType: string }, synopsis: string, featured?: boolean }
export type AddAnime = (input: Input) => Promise<void>

export const AddAnimeUseCase: Setup = (animeRepository, categoryRepository) => async ({ name, categoryId, file, synopsis, featured }) => {
  const nameLowerCase = name.toLocaleLowerCase()
  const animeExists = await animeRepository.check({ name: nameLowerCase })
  if (animeExists) throw new FieldInUseError('name')
  await categoryRepository.checkById({ id: categoryId })
}
