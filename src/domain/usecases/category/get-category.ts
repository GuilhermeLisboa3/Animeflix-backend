import { LoadCategoryById } from '@/domain/contracts/database/category'
import { NotFoundError } from '@/domain/errors'

type Setup = (categoryRepository: LoadCategoryById) => GetCategory
type Input = { id: string }
export type GetCategory = (input: Input) => Promise<void>

export const GetCategoryUseCase: Setup = (categoryRepository) => async ({ id }) => {
  const category = await categoryRepository.loadById({ id })
  if (!category) throw new NotFoundError('categoryId')
}
