import { CheckAnime, CreateAnime, DeleteAnimeById, LoadAnimeById, UpdateAnimeRepository } from '@/domain/contracts/database/anime'
import { Anime } from '@/infra/database/postgres/entities'

export class AnimeRepository implements CheckAnime, CreateAnime, LoadAnimeById, DeleteAnimeById, UpdateAnimeRepository {
  async check ({ name }: CheckAnime.Input): Promise<CheckAnime.Output> {
    const existAnime = await Anime.findOne({ where: { name } })
    return existAnime !== null
  }

  async create ({ name, categoryId, synopsis, featured, thumbnailUrl }: CreateAnime.Input): Promise<CreateAnime.Output> {
    const anime = await Anime.create({ name, categoryId, synopsis, featured, thumbnailUrl })
    return anime !== null
  }

  async loadById ({ id }: LoadAnimeById.Input): Promise<LoadAnimeById.Output> {
    const anime = await Anime.findByPk(id, { attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']] })
    return anime !== null ? anime : undefined
  }

  async deleteById ({ id }: DeleteAnimeById.Input): Promise<void> {
    await Anime.destroy({ where: { id } })
  }

  async update ({ id, categoryId, featured, name, synopsis, thumbnailUrl }: UpdateAnimeRepository.Input): Promise<void> {
    const attributes = { categoryId, featured, name, synopsis, thumbnailUrl }
    await Anime.update(attributes, { where: { id } })
  }
}
