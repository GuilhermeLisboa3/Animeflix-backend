import { ListAnimeNewestController } from '@/application/controllers/anime'
import { makeAnimeRepository } from '@/main/factories/infra/database/postgres/anime'

export const makeListAnimeNewestController = (): ListAnimeNewestController => {
  return new ListAnimeNewestController(makeAnimeRepository().listNewest)
}
