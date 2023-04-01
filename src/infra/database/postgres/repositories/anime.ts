import { CheckAnime, CreateAnime } from '@/domain/contracts/database/anime'
import { Anime } from '@/infra/database/postgres/entities'

export class AnimeRepository implements CheckAnime, CreateAnime {
  async check ({ name }: CheckAnime.Input): Promise<CheckAnime.Output> {
    const existAnime = await Anime.findOne({ where: { name } })
    return existAnime !== null
  }

  async create ({ name, categoryId, synopsis, featured, thumbnailUrl }: CreateAnime.Input): Promise<CreateAnime.Output> {
    const anime = await Anime.create({ name, categoryId, synopsis, featured, thumbnailUrl })
    return anime !== null
  }
}
