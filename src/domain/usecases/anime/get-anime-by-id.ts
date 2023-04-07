import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { LoadEpisodeByAnimeId } from '@/domain/contracts/database/episode'
import { CheckFavorite } from '@/domain/contracts/database/favorite'
import { CheckLike } from '@/domain/contracts/database/like'
import { NotFoundError } from '@/domain/errors'

type Setup = (animeRepository: LoadAnimeById, episodeRepository: LoadEpisodeByAnimeId, likeRepository: CheckLike, favoriteRepository: CheckFavorite) => GetAnimeById
type Input = { id: string, accountId: string }
type Output = { id: number, name: string, thumbnailUrl: string, synopsis: string, episodes: Array<{ id: number, name: string, videoUrl: string, synopsis: string, secondsLong: number, order: number }>, liked: boolean }
export type GetAnimeById = (input: Input) => Promise<Output>

export const GetAnimeByIdUseCase: Setup = (animeRepository, episodeRepository, likeRepository, favoriteRepository) => async ({ id, accountId }) => {
  const anime = await animeRepository.loadById({ id })
  if (!anime) throw new NotFoundError('id')
  const episodes = await episodeRepository.loadByAnimeId({ animeId: id })
  const liked = await likeRepository.check({ userId: Number(accountId), animeId: Number(id) })
  await favoriteRepository.check({ userId: accountId, animeId: id })
  return {
    id: anime.id,
    name: anime.name,
    thumbnailUrl: anime.thumbnailUrl,
    synopsis: anime.synopsis,
    episodes,
    liked
  }
}
