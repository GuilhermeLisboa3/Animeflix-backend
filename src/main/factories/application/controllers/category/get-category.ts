import { GetCategoryController } from '@/application/controllers/category'
import { makeCategoryRepository } from '@/main/factories/infra/database/postgres'
export const makeGetCategoryController = (): GetCategoryController => {
  return new GetCategoryController(makeCategoryRepository().loadById)
}
