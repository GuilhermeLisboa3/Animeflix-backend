import { LoadAnimeById } from '@/domain/contracts/database/anime'

type Setup = (animeRepository: LoadAnimeById) => GetAnimeById
type Input = { id: string }
export type GetAnimeById = (input: Input) => Promise<void>

export const GetAnimeByIdUseCase: Setup = (animeRepository) => async ({ id }) => {
  await animeRepository.loadById({ id })
}
