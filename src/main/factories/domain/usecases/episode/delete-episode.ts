import { DeleteEpisode, DeleteEpisodeUseCase } from '@/domain/usecases/episode'
import { makeEpisodeRepository } from '@/main/factories/infra/database/postgres'
import { makeAwsS3FileStorage } from '@/main/factories/infra/gateways'

export const makeDeleteEpisode = (): DeleteEpisode => {
  return DeleteEpisodeUseCase(makeEpisodeRepository(), makeAwsS3FileStorage())
}
