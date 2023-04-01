import { CheckAnime } from '@/domain/contracts/database/anime'
import { Anime } from '@/infra/database/postgres/entities'

export class AnimeRepository implements CheckAnime {
  async check ({ name }: CheckAnime.Input): Promise<CheckAnime.Output> {
    const existAnime = await Anime.findOne({ where: { name } })
    return existAnime !== null
  }
}
