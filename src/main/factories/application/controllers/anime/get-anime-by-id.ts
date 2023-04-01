import { GetAnimeByIdController } from '@/application/controllers/anime'
import { makeGetAnimeById } from '@/main/factories/domain/usecases/anime'

export const makeGetAnimeByIdController = (): GetAnimeByIdController => {
  return new GetAnimeByIdController(makeGetAnimeById())
}
