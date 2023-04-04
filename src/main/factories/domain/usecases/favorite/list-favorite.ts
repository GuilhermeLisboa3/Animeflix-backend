import { ListFavorite, ListFavoriteUseCase } from '@/domain/usecases/favorite'
import { makeAccountRespository, makeFavoriteRepository, makeAnimeRepository } from '@/main/factories/infra/database/postgres'

export const makeListFavorite = (): ListFavorite => {
  return ListFavoriteUseCase(makeAccountRespository(), makeFavoriteRepository(), makeAnimeRepository())
}
