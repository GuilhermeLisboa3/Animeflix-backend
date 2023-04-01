import { DeleteAnime, DeleteAnimeUseCase } from '@/domain/usecases/anime'
import { makeAnimeRepository } from '@/main/factories/infra/database/postgres'
import { makeAwsS3FileStorage } from '@/main/factories/infra/gateways'

export const makeDeleteAnime = (): DeleteAnime => {
  return DeleteAnimeUseCase(makeAnimeRepository(), makeAwsS3FileStorage())
}
