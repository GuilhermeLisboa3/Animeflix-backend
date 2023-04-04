import { DeleteFavorite, DeleteFavoriteUseCase } from '@/domain/usecases/favorite'
import { makeAccountRespository, makeFavoriteRepository, makeAnimeRepository } from '@/main/factories/infra/database/postgres'

export const makeDeleteFavorite = (): DeleteFavorite => {
  return DeleteFavoriteUseCase(makeAccountRespository(), makeAnimeRepository(), makeFavoriteRepository())
}
