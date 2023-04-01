import { UpdateAnimeController } from '@/application/controllers/anime'
import { makeUpdateAnime } from '@/main/factories/domain/usecases/anime'

export const makeUpdateAnimeController = (): UpdateAnimeController => {
  return new UpdateAnimeController(makeUpdateAnime())
}
