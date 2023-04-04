import { LoadCategoryById } from '@/domain/contracts/database/category'

type Setup = (categoryRepository: LoadCategoryById) => GetCategory
type Input = { id: string }
export type GetCategory = (input: Input) => Promise<void>

export const GetCategoryUseCase: Setup = (categoryRepository) => async ({ id }) => {
  await categoryRepository.loadById({ id })
}
