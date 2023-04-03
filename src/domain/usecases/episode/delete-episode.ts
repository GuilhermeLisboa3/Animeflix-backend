import { LoadEpisodeById } from '@/domain/contracts/database/episode'

type Setup = (episodeRepository: LoadEpisodeById) => DeleteEpisode
type Input = { episodeId: string }
export type DeleteEpisode = (input: Input) => Promise<void>

export const DeleteEpisodeUseCase: Setup = (episodeRepository) => async ({ episodeId }) => {
  await episodeRepository.loadById({ id: episodeId })
}
