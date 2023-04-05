import { GetCategoryController } from '@/application/controllers/category'
import { makeGetCategory } from '@/main/factories/domain/usecases/category'
export const makeGetCategoryController = (): GetCategoryController => {
  return new GetCategoryController(makeGetCategory())
}
