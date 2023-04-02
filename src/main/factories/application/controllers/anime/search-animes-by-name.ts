import { SearchAnimesByNameController } from '@/application/controllers/anime'
import { makeSearchAnimesByName } from '@/main/factories/domain/usecases/anime'

export const makeSearchAnimesByNameController = (): SearchAnimesByNameController => {
  return new SearchAnimesByNameController(makeSearchAnimesByName())
}
