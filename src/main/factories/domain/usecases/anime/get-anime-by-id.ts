import { GetAnimeById, GetAnimeByIdUseCase } from '@/domain/usecases/anime'
import { makeAnimeRepository, makeEpisodeRepository, makeLikeRepository } from '@/main/factories/infra/database/postgres'

export const makeGetAnimeById = (): GetAnimeById => {
  return GetAnimeByIdUseCase(makeAnimeRepository(), makeEpisodeRepository(), makeLikeRepository())
}
