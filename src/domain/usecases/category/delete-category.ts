import { LoadCategoryById } from '@/domain/contracts/database/category'

type Setup = (categoryRepository: LoadCategoryById) => DeleteCategory
type Input = { id: string }
export type DeleteCategory = (input: Input) => Promise<void>

export const DeleteCategoryUseCase: Setup = (categoryRepository) => async ({ id }) => {
  await categoryRepository.loadById({ id })
}
