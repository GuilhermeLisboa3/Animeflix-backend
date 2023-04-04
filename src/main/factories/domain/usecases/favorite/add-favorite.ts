import { AddFavorite, AddFavoriteUseCase } from '@/domain/usecases/favorite'
import { makeAccountRespository, makeFavoriteRepository, makeAnimeRepository } from '@/main/factories/infra/database/postgres'

export const makeAddFavorite = (): AddFavorite => {
  return AddFavoriteUseCase(makeAccountRespository(), makeAnimeRepository(), makeFavoriteRepository())
}
