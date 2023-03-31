import { CheckCategory } from '@/domain/contracts/database/category'
import { FieldInUseError } from '@/domain/errors'

type Setup = (categoryRepository: CheckCategory) => AddCategory
type Input = { name: string, position: number }
export type AddCategory = (input: Input) => Promise<void>

export const AddCategoryUseCase: Setup = (categoryRepository) => async ({ name, position }) => {
  const nameLowerCase = name.toLocaleLowerCase()
  const categoryExists = await categoryRepository.check({ name: nameLowerCase, position })
  if (categoryExists) throw new FieldInUseError('name or position')
}
