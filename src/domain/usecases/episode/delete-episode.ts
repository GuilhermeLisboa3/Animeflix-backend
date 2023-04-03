import { LoadEpisodeById } from '@/domain/contracts/database/episode'
import { NotFoundError } from '@/domain/errors'

type Setup = (episodeRepository: LoadEpisodeById) => DeleteEpisode
type Input = { episodeId: string }
export type DeleteEpisode = (input: Input) => Promise<void>

export const DeleteEpisodeUseCase: Setup = (episodeRepository) => async ({ episodeId }) => {
  const episode = await episodeRepository.loadById({ id: episodeId })
  if (!episode) throw new NotFoundError('episodeId')
}
