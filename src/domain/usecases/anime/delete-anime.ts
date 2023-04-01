import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { DeleteFile } from '@/domain/contracts/gateways'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: LoadAnimeById, fileStorage: DeleteFile) => DeleteAnime
type Input = { id: string }
export type DeleteAnime = (input: Input) => Promise<void>

export const DeleteAnimeUseCase: Setup = (animeRepository, fileStorage) => async ({ id }) => {
  const anime = await animeRepository.loadById({ id })
  if (!anime) throw new NotFoundError('id')
  if (anime.thumbnailUrl !== null) {
    await fileStorage.delete({ fileName: anime.thumbnailUrl })
  }
}
