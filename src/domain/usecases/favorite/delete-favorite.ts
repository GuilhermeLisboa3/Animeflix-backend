import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, animeRepository: CheckAnimeById) => DeleteFavorite
type Input = { accountId: string, animeId: string}
export type DeleteFavorite = (input: Input) => Promise<void>

export const DeleteFavoriteUseCase: Setup = (accountRepository, animeRepository) => async ({ accountId, animeId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
  await animeRepository.checkById({ id: Number(animeId) })
}
