import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { DeleteFavoriteRepository } from '@/domain/contracts/database/favorite'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, animeRepository: CheckAnimeById, favoriteRepository: DeleteFavoriteRepository) => DeleteFavorite
type Input = { accountId: string, animeId: string}
export type DeleteFavorite = (input: Input) => Promise<void>

export const DeleteFavoriteUseCase: Setup = (accountRepository, animeRepository, favoriteRepository) => async ({ accountId, animeId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
  const existAnime = await animeRepository.checkById({ id: Number(animeId) })
  if (!existAnime) throw new NotFoundError('animeId')
  await favoriteRepository.delete({ userId: Number(accountId), animeId: Number(animeId) })
}
