import { DeleteCategoryController } from '@/application/controllers/category'
import { makeDeleteCategory } from '@/main/factories/domain/usecases/category'
export const makeDeleteCategoryController = (): DeleteCategoryController => {
  return new DeleteCategoryController(makeDeleteCategory())
}
