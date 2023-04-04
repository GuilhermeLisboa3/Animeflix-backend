import { ListFavoriteController } from '@/application/controllers/favorite'
import { makeListFavorite } from '@/main/factories/domain/usecases/favorite'

export const makeListFavoriteController = (): ListFavoriteController => {
  return new ListFavoriteController(makeListFavorite())
}
