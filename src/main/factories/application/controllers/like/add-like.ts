import { AddLikeController } from '@/application/controllers/like'
import { makeAddLike } from '@/main/factories/domain/usecases/like'

export const makeAddLikeController = (): AddLikeController => {
  return new AddLikeController(makeAddLike())
}
