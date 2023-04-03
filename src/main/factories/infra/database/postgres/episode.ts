import { EpisodeRepository } from '@/infra/database/postgres/repositories'

export const makeEpisodeRepository = (): EpisodeRepository => {
  return new EpisodeRepository()
}
