import { CheckAccountById } from '@/domain/contracts/database/account'

type Setup = (accountRepository: CheckAccountById) => ListFavorite
type Input = { accountId: string }
export type ListFavorite = (input: Input) => Promise<void>

export const ListFavoriteUseCase: Setup = (accountRepository) => async ({ accountId }) => {
  await accountRepository.checkById({ id: Number(accountId) })
}
