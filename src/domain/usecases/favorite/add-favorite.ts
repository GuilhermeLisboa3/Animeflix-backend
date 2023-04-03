import { CheckAccountById } from '@/domain/contracts/database/account'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById) => AddFavorite
type Input = { accountId: string, animeId: number}
export type AddFavorite = (input: Input) => Promise<void>

export const AddFavoriteUseCase: Setup = (accountRepository) => async ({ accountId, animeId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
}
