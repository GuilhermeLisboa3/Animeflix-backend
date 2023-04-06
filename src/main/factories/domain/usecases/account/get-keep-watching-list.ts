import { KeepWatchingList, GetKeepWatchingListUseCase } from '@/domain/usecases/account'
import { makeAnimeRepository, makeWatchTimeRepository, makeEpisodeRepository } from '@/main/factories/infra/database/postgres'

export const makeKeepWatchingList = (): KeepWatchingList => {
  return GetKeepWatchingListUseCase(makeWatchTimeRepository(), makeEpisodeRepository(), makeAnimeRepository())
}
