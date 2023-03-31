import { DeleteCategoryUseCase, DeleteCategory } from '@/domain/usecases/category'
import { makeCategoryRepository } from '@/main/factories/infra/database/postgres'

export const makeDeleteCategory = (): DeleteCategory => {
  return DeleteCategoryUseCase(makeCategoryRepository())
}
