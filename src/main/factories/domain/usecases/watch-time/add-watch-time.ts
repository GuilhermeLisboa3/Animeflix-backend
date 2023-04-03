import { AddWatchTime, AddWatchTimeUseCase } from '@/domain/usecases/watch-time'
import { makeAccountRespository, makeWatchTimeRepository, makeEpisodeRepository } from '@/main/factories/infra/database/postgres'

export const makeAddWatchTime = (): AddWatchTime => {
  return AddWatchTimeUseCase(makeAccountRespository(), makeEpisodeRepository(), makeWatchTimeRepository())
}
