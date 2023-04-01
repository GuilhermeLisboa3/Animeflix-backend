import { AnimeRepository } from '@/infra/database/postgres/repositories'

export const makeAnimeRepository = (): AnimeRepository => {
  return new AnimeRepository()
}
