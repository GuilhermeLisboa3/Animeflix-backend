import { ListAnimeByFeaturedController } from '@/application/controllers/anime'
import { makeAnimeRepository } from '@/main/factories/infra/database/postgres/anime'

export const makeListAnimeByFeaturedController = (): ListAnimeByFeaturedController => {
  return new ListAnimeByFeaturedController(makeAnimeRepository().listByFeatured)
}
