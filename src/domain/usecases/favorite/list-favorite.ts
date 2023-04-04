import { CheckAccountById } from '@/domain/contracts/database/account'
import { ListFavoriteRepository } from '@/domain/contracts/database/favorite'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, favoriteRepository: ListFavoriteRepository) => ListFavorite
type Input = { accountId: string }
export type ListFavorite = (input: Input) => Promise<void>

export const ListFavoriteUseCase: Setup = (accountRepository, favoriteRepository) => async ({ accountId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
  await favoriteRepository.list({ userId: Number(accountId) })
}
