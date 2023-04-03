import { AddEpisode, AddEpisodeUseCase } from '@/domain/usecases/episode'
import { makeAnimeRepository, makeEpisodeRepository } from '@/main/factories/infra/database/postgres'
import { makeUUIDAdapter, makeAwsS3FileStorage } from '@/main/factories/infra/gateways'

export const makeAddEpisode = (): AddEpisode => {
  return AddEpisodeUseCase(makeAnimeRepository(), makeEpisodeRepository(), makeUUIDAdapter(), makeAwsS3FileStorage())
}
