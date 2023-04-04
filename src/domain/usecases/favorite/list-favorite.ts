import { CheckAccountById } from '@/domain/contracts/database/account'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById) => ListFavorite
type Input = { accountId: string }
export type ListFavorite = (input: Input) => Promise<void>

export const ListFavoriteUseCase: Setup = (accountRepository) => async ({ accountId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
}
