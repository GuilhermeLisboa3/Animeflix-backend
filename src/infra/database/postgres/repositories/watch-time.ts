import { SaveWatchTime } from '@/domain/contracts/database/watch-time'
import { WatchTime } from '@/infra/database/postgres/entities'

export class WatchTimeRepository implements SaveWatchTime {
  async save ({ episodeId, seconds, userId }: SaveWatchTime.Input): Promise<void> {
    const watchTimeAlreadyExists = await WatchTime.findOne({ where: { userId, episodeId } })
    if (watchTimeAlreadyExists) {
      watchTimeAlreadyExists.seconds = seconds
      await watchTimeAlreadyExists.save()
    } else {
      await WatchTime.create({ userId, episodeId, seconds })
    }
  }
}
