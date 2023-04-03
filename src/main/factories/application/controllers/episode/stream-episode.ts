import { StreamEpisodeController } from '@/application/controllers/episode'
import { makeEpisodeRepository } from '@/main/factories/infra/database/postgres'

export const makeStreamEpisodeController = (): StreamEpisodeController => {
  return new StreamEpisodeController(makeEpisodeRepository().load)
}
