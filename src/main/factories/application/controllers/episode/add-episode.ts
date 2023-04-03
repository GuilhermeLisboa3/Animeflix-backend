import { AddEpisodeController } from '@/application/controllers/episode'
import { makeAddEpisode } from '@/main/factories/domain/usecases/episode'

export const makeAddEpisodeController = (): AddEpisodeController => {
  return new AddEpisodeController(makeAddEpisode())
}
