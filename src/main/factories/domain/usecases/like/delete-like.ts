import { DeleteLike, DeleteLikeUseCase } from '@/domain/usecases/like'
import { makeAccountRespository, makeLikeRepository, makeAnimeRepository } from '@/main/factories/infra/database/postgres'

export const makeDeleteLike = (): DeleteLike => {
  return DeleteLikeUseCase(makeAccountRespository(), makeAnimeRepository(), makeLikeRepository())
}
