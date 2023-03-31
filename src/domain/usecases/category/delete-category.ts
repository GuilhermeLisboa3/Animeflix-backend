import { NotFoundError } from '@/domain/errors'
import { LoadCategoryById } from '@/domain/contracts/database/category'

type Setup = (categoryRepository: LoadCategoryById) => DeleteCategory
type Input = { id: string }
export type DeleteCategory = (input: Input) => Promise<void>

export const DeleteCategoryUseCase: Setup = (categoryRepository) => async ({ id }) => {
  const category = await categoryRepository.loadById({ id })
  if (!category) throw new NotFoundError('category')
}
