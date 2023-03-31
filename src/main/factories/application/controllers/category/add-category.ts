import { AddCategoryController } from '@/application/controllers/category'
import { makeAddCategory } from '@/main/factories/domain/usecases/category'

export const makeAddCategoryController = (): AddCategoryController => {
  return new AddCategoryController(makeAddCategory())
}
