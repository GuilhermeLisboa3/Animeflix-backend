import { AddLike, AddLikeUseCase } from '@/domain/usecases/like'
import { makeAccountRespository, makeLikeRepository, makeAnimeRepository } from '@/main/factories/infra/database/postgres'

export const makeAddLike = (): AddLike => {
  return AddLikeUseCase(makeAccountRespository(), makeAnimeRepository(), makeLikeRepository())
}
