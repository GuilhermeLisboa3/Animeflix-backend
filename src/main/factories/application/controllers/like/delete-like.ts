import { DeleteLikeController } from '@/application/controllers/like'
import { makeDeleteLike } from '@/main/factories/domain/usecases/like'

export const makeDeleteLikeController = (): DeleteLikeController => {
  return new DeleteLikeController(makeDeleteLike())
}
