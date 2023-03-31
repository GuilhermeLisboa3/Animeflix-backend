import { ListCategory, ListCategoryUseCase } from '@/domain/usecases/category'
import { makeCategoryRepository } from '@/main/factories/infra/database/postgres'

export const makeListCategory = (): ListCategory => {
  return ListCategoryUseCase(makeCategoryRepository())
}
