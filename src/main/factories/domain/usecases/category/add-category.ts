import { AddCategory, AddCategoryUseCase } from '@/domain/usecases/category'
import { makeCategoryRepository } from '@/main/factories/infra/database/postgres'

export const makeAddCategory = (): AddCategory => {
  return AddCategoryUseCase(makeCategoryRepository())
}
