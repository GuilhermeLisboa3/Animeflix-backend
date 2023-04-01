import { UpdateAnime, UpdateAnimeUseCase } from '@/domain/usecases/anime'
import { makeAnimeRepository, makeCategoryRepository } from '@/main/factories/infra/database/postgres'
import { makeUUIDAdapter, makeAwsS3FileStorage } from '@/main/factories/infra/gateways'

export const makeUpdateAnime = (): UpdateAnime => {
  return UpdateAnimeUseCase(makeAnimeRepository(), makeAwsS3FileStorage(), makeUUIDAdapter(), makeCategoryRepository())
}
