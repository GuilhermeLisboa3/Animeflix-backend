import { DeleteEpisodeController } from '@/application/controllers/episode'
import { makeDeleteEpisode } from '@/main/factories/domain/usecases/episode'

export const makeDeleteEpisodeController = (): DeleteEpisodeController => {
  return new DeleteEpisodeController(makeDeleteEpisode())
}
