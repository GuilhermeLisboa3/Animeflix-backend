import { CheckEpisodeByOrder, CreateEpisode } from '@/domain/contracts/database/episode'
import { Episode } from '@/infra/database/postgres/entities'

export class EpisodeRepository implements CheckEpisodeByOrder, CreateEpisode {
  async checkByOrder ({ order }: CheckEpisodeByOrder.Input): Promise<CheckEpisodeByOrder.Output> {
    const existEpisode = await Episode.findOne({ where: { order } })
    return existEpisode !== null
  }

  async create ({ name, animeId, order, synopsis, secondsLong, videoUrl }: CreateEpisode.Input): Promise<CreateEpisode.Output> {
    const episode = await Episode.create({ name, animeId, order, synopsis, secondsLong, videoUrl })
    return episode !== null
  }
}
