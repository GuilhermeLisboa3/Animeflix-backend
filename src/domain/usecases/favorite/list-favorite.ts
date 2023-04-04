import { CheckAccountById } from '@/domain/contracts/database/account'
import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { ListFavoriteRepository } from '@/domain/contracts/database/favorite'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, favoriteRepository: ListFavoriteRepository, animeRepository: LoadAnimeById) => ListFavorite
type Input = { accountId: string }
export type ListFavorite = (input: Input) => Promise<void>

export const ListFavoriteUseCase: Setup = (accountRepository, favoriteRepository, animeRepository) => async ({ accountId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
  const listAnimeId = await favoriteRepository.list({ userId: Number(accountId) })
  if (listAnimeId) {
    for (const animeId of listAnimeId) {
      await animeRepository.loadById({ id: animeId.toString() })
    }
  }
}
