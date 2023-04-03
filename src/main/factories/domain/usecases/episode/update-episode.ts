import { UpdateEpisode, UpdateEpisodeUseCase } from '@/domain/usecases/episode'
import { makeAnimeRepository, makeEpisodeRepository } from '@/main/factories/infra/database/postgres'
import { makeUUIDAdapter, makeAwsS3FileStorage } from '@/main/factories/infra/gateways'

export const makeUpdateEpisode = (): UpdateEpisode => {
  return UpdateEpisodeUseCase(makeEpisodeRepository(), makeAwsS3FileStorage(), makeUUIDAdapter(), makeAnimeRepository())
}
