import { CheckCategory } from '@/domain/contracts/database/category'

type Setup = (categoryRepository: CheckCategory) => AddCategory
type Input = { name: string, position: number }
export type AddCategory = (input: Input) => Promise<void>

export const AddCategoryUseCase: Setup = (categoryRepository) => async ({ name, position }) => {
  const nameLowerCase = name.toLocaleLowerCase()
  await categoryRepository.check({ name: nameLowerCase, position })
}
