import { ListCategoryController } from '@/application/controllers/category'
import { makeListCategory } from '@/main/factories/domain/usecases/category'

export const makeListCategoryController = (): ListCategoryController => {
  return new ListCategoryController(makeListCategory())
}
