import { AddFavoriteController } from '@/application/controllers/favorite'
import { makeAddFavorite } from '@/main/factories/domain/usecases/favorite'

export const makeAddFavoriteController = (): AddFavoriteController => {
  return new AddFavoriteController(makeAddFavorite())
}
