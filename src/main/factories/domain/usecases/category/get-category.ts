import { GetCategory, GetCategoryUseCase } from '@/domain/usecases/category'
import { makeCategoryRepository, makeAnimeRepository } from '@/main/factories/infra/database/postgres'

export const makeGetCategory = (): GetCategory => {
  return GetCategoryUseCase(makeCategoryRepository(), makeAnimeRepository())
}
