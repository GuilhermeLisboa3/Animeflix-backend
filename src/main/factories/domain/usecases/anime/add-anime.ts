import { AddAnime, AddAnimeUseCase } from '@/domain/usecases/anime'
import { makeAnimeRepository, makeCategoryRepository } from '@/main/factories/infra/database/postgres'
import { makeUUIDAdapter, makeAwsS3FileStorage } from '@/main/factories/infra/gateways'

export const makeAddAnime = (): AddAnime => {
  return AddAnimeUseCase(makeAnimeRepository(), makeCategoryRepository(), makeUUIDAdapter(), makeAwsS3FileStorage())
}
