import { UpdateEpisodeController } from '@/application/controllers/episode'
import { makeUpdateEpisode } from '@/main/factories/domain/usecases/episode'

export const makeUpdateEpisodeController = (): UpdateEpisodeController => {
  return new UpdateEpisodeController(makeUpdateEpisode())
}
