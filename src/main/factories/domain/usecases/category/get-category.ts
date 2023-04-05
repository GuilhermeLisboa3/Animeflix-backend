import { GetCategory, GetCategoryUseCase } from '@/domain/usecases/category'
import { makeCategoryRepository } from '@/main/factories/infra/database/postgres'

export const makeGetCategory = (): GetCategory => {
  return GetCategoryUseCase(makeCategoryRepository())
}
