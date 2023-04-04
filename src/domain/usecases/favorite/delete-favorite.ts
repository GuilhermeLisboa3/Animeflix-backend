import { CheckAccountById } from '@/domain/contracts/database/account'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById) => DeleteFavorite
type Input = { accountId: string, animeId: string}
export type DeleteFavorite = (input: Input) => Promise<void>

export const DeleteFavoriteUseCase: Setup = (accountRepository) => async ({ accountId, animeId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
}
