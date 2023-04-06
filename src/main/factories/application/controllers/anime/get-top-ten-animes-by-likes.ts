import { GetTopTenAnimesByLikesController } from '@/application/controllers/anime'
import { makeAnimeRepository } from '@/main/factories/infra/database/postgres/anime'

export const makeGetTopTenAnimesByLikesController = (): GetTopTenAnimesByLikesController => {
  return new GetTopTenAnimesByLikesController(makeAnimeRepository().getTopTenByLikes)
}
