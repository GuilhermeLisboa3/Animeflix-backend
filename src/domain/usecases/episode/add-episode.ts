import { CheckAnimeById } from '@/domain/contracts/database/anime'

type Setup = (animeRepository: CheckAnimeById) => AddEpisode
type Input = { animeId: number, name: string, synopsis: string, secondsLong?: number, order: number, file?: { buffer: Buffer, mimeType: string } }
export type AddEpisode = (input: Input) => Promise<void>

export const AddEpisodeUseCase: Setup = (animeRepository) => async ({ animeId, order, file, name, synopsis, secondsLong }) => {
  await animeRepository.checkById({ id: animeId })
}
