import { FavoriteRepository } from '@/infra/database/postgres/repositories'

export const makeFavoriteRepository = (): FavoriteRepository => {
  return new FavoriteRepository()
}
