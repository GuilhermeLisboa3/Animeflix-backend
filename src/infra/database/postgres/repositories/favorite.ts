import { CreateFavorite } from '@/domain/contracts/database/favorite'
import { Favorite } from '@/infra/database/postgres/entities'

export class FavoriteRepository implements CreateFavorite {
  async create ({ animeId, userId }: CreateFavorite.Input): Promise<void> {
    await Favorite.create({ animeId, userId })
  }
}
