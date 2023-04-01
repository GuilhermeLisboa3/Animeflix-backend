import { GetAnimeById, GetAnimeByIdUseCase } from '@/domain/usecases/anime'
import { makeAnimeRepository } from '@/main/factories/infra/database/postgres'

export const makeGetAnimeById = (): GetAnimeById => {
  return GetAnimeByIdUseCase(makeAnimeRepository())
}
