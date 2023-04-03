import { LoadWatchTime, SaveWatchTime } from '@/domain/contracts/database/watch-time'
import { WatchTime } from '@/infra/database/postgres/entities'

export class WatchTimeRepository implements SaveWatchTime, LoadWatchTime {
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
    return watchTime !== null ? { seconds: watchTime.seconds } : { seconds: 0 }
  }
}
