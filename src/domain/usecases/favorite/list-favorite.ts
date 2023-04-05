import { CheckAccountById } from '@/domain/contracts/database/account'
import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { ListFavoriteRepository } from '@/domain/contracts/database/favorite'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, favoriteRepository: ListFavoriteRepository, animeRepository: LoadAnimeById) => ListFavorite
type Input = { accountId: string }
type Output = { accountId: number, animes: Array<{ id: number, name: string, thumbnailUrl: string, synopsis: string }> | [] }
export type ListFavorite = (input: Input) => Promise<Output>

export const ListFavoriteUseCase: Setup = (accountRepository, favoriteRepository, animeRepository) => async ({ accountId }) => {
  const accountIdNumber = Number(accountId)
  const existAccount = await accountRepository.checkById({ id: accountIdNumber })
  if (!existAccount) throw new NotFoundError('accountId')
  const listAnimeId = await favoriteRepository.list({ userId: accountIdNumber })
  const animes = []
  if (listAnimeId) {
    for (const animeId of listAnimeId) {
      const anime = await animeRepository.loadById({ id: animeId.toString() })
      if (anime) animes.push(anime)
    }
  }
  return { accountId: accountIdNumber, animes: animes.map(anime => ({ id: anime.id, name: anime.name, synopsis: anime.synopsis, thumbnailUrl: anime.thumbnailUrl })) }
}
