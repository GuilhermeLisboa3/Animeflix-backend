import { CreateFavorite, DeleteFavoriteRepository } from '@/domain/contracts/database/favorite'
import { Favorite } from '@/infra/database/postgres/entities'

export class FavoriteRepository implements CreateFavorite, DeleteFavoriteRepository {
  async create ({ animeId, userId }: CreateFavorite.Input): Promise<void> {
    await Favorite.create({ animeId, userId })
  }

  async delete ({ animeId, userId }: DeleteFavoriteRepository.Input): Promise<void> {
    await Favorite.destroy({ where: { animeId, userId } })
  }
}
