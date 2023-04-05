import { LoadAnimesByCategoryId } from '@/domain/contracts/database/anime'
import { LoadCategoryById } from '@/domain/contracts/database/category'
import { NotFoundError } from '@/domain/errors'

type Setup = (categoryRepository: LoadCategoryById, animeRepository: LoadAnimesByCategoryId) => GetCategory
type Input = { id: string }
export type GetCategory = (input: Input) => Promise<void>

export const GetCategoryUseCase: Setup = (categoryRepository, animeRepository) => async ({ id }) => {
  const category = await categoryRepository.loadById({ id })
  if (!category) throw new NotFoundError('categoryId')
  await animeRepository.loadByCategoryId({ categoryId: id })
}
