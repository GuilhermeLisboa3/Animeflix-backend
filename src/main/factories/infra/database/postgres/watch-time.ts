import { WatchTimeRepository } from '@/infra/database/postgres/repositories'

export const makeWatchTimeRepository = (): WatchTimeRepository => {
  return new WatchTimeRepository()
}
