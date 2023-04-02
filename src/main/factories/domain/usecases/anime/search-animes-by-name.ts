import { SearchAnimesByName, SearchAnimesByNameUseCase } from '@/domain/usecases/anime'
import { makeAnimeRepository } from '@/main/factories/infra/database/postgres'

export const makeSearchAnimesByName = (): SearchAnimesByName => {
  return SearchAnimesByNameUseCase(makeAnimeRepository())
}
