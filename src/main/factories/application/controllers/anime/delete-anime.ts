import { DeleteAnimeController } from '@/application/controllers/anime'
import { makeDeleteAnime } from '@/main/factories/domain/usecases/anime'

export const makeDeleteAnimeController = (): DeleteAnimeController => {
  return new DeleteAnimeController(makeDeleteAnime())
}
