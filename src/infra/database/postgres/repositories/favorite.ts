import { CreateFavorite, DeleteFavoriteRepository, ListFavoriteRepository, CheckFavorite } from '@/domain/contracts/database/favorite'
import { Favorite } from '@/infra/database/postgres/entities'

export class FavoriteRepository implements CreateFavorite, DeleteFavoriteRepository, ListFavoriteRepository, CheckFavorite {
  async create ({ animeId, userId }: CreateFavorite.Input): Promise<void> {
    await Favorite.create({ animeId, userId })
  }

  async delete ({ animeId, userId }: DeleteFavoriteRepository.Input): Promise<void> {
    await Favorite.destroy({ where: { animeId, userId } })
  }

  async list ({ userId }: ListFavoriteRepository.Input): Promise<ListFavoriteRepository.Output> {
    const listFavorites = await Favorite.findAll({ where: { userId } })
    const listAnimeId = listFavorites.map(favorite => favorite.animeId)
    return listAnimeId.length === 0 ? undefined : listAnimeId
  }

  async check ({ userId, animeId }: CheckFavorite.Input): Promise<CheckFavorite.Output> {
    const checkFavorite = await Favorite.findOne({ where: { userId, animeId } })
    return checkFavorite !== null
  }
}
