import { AddAnimeController } from '@/application/controllers/anime'
import { makeAddAnime } from '@/main/factories/domain/usecases/anime'

export const makeAddAnimeController = (): AddAnimeController => {
  return new AddAnimeController(makeAddAnime())
}
