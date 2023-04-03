import { LoadEpisodeById, DeleteEpisodeById } from '@/domain/contracts/database/episode'
import { DeleteFile } from '@/domain/contracts/gateways'
import { NotFoundError } from '@/domain/errors'

type Setup = (episodeRepository: LoadEpisodeById & DeleteEpisodeById, fileStorage: DeleteFile) => DeleteEpisode
type Input = { episodeId: string }
export type DeleteEpisode = (input: Input) => Promise<void>

export const DeleteEpisodeUseCase: Setup = (episodeRepository, fileStorage) => async ({ episodeId }) => {
  const episode = await episodeRepository.loadById({ id: episodeId })
  if (!episode) throw new NotFoundError('episodeId')
  if (episode.videoUrl !== null) {
    await fileStorage.delete({ fileName: episode.videoUrl })
  }

  await episodeRepository.deleteById({ id: episodeId })
}
