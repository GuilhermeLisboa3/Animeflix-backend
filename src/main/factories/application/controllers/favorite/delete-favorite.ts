import { DeleteFavoriteController } from '@/application/controllers/favorite'
import { makeDeleteFavorite } from '@/main/factories/domain/usecases/favorite'

export const makeDeleteFavoriteController = (): DeleteFavoriteController => {
  return new DeleteFavoriteController(makeDeleteFavorite())
}
