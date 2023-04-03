import { GetWatchTime, GetWatchTimeUseCase } from '@/domain/usecases/watch-time'
import { makeAccountRespository, makeWatchTimeRepository, makeEpisodeRepository } from '@/main/factories/infra/database/postgres'

export const makeGetWatchTime = (): GetWatchTime => {
  return GetWatchTimeUseCase(makeAccountRespository(), makeEpisodeRepository(), makeWatchTimeRepository())
}
