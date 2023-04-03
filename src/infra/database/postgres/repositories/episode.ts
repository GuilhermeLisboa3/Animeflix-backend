import { CheckEpisodeByOrder } from '@/domain/contracts/database/episode'
import { Episode } from '@/infra/database/postgres/entities'

export class EpisodeRepository implements CheckEpisodeByOrder {
  async checkByOrder ({ order }: CheckEpisodeByOrder.Input): Promise<CheckEpisodeByOrder.Output> {
    const existEpisode = await Episode.findOne({ where: { order } })
    return existEpisode !== null
  }
}
