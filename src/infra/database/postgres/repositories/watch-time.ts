import { LoadWatchTime, SaveWatchTime, LoadWatchTimeByUserId } from '@/domain/contracts/database/watch-time'
import { WatchTime } from '@/infra/database/postgres/entities'

export class WatchTimeRepository implements SaveWatchTime, LoadWatchTime, LoadWatchTimeByUserId {
  async save ({ episodeId, seconds, userId }: SaveWatchTime.Input): Promise<void> {
    const watchTimeAlreadyExists = await WatchTime.findOne({ where: { userId, episodeId } })
    if (watchTimeAlreadyExists) {
      watchTimeAlreadyExists.seconds = seconds
      await watchTimeAlreadyExists.save()
    } else {
      await WatchTime.create({ userId, episodeId, seconds })
    }
  }

  async load ({ episodeId, userId }: LoadWatchTime.Input): Promise<LoadWatchTime.Output> {
    const watchTime = await WatchTime.findOne({ where: { episodeId, userId } })
    if (!watchTime) return null
    return watchTime
  }

  async loadByUserId ({ userId }: LoadWatchTimeByUserId.Input): Promise<LoadWatchTimeByUserId.Output> {
    const listWatchTime = await WatchTime.findAll({ where: { userId } })
    const listEpisodeId = listWatchTime.map(watchTime => watchTime.episodeId)
    return listEpisodeId.length === 0 ? [] : listEpisodeId
  }
}
