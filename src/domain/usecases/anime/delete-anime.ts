import { LoadAnimeById } from '@/domain/contracts/database/anime'

type Setup = (animeRepository: LoadAnimeById) => DeleteAnime
type Input = { id: string }
export type DeleteAnime = (input: Input) => Promise<void>

export const DeleteAnimeUseCase: Setup = (animeRepository) => async ({ id }) => {
  await animeRepository.loadById({ id })
}
