import { CheckAccountById } from '@/domain/contracts/database/account'

type Setup = (accountRepository: CheckAccountById) => AddFavorite
type Input = { accountId: string, animeId: number}
export type AddFavorite = (input: Input) => Promise<void>

export const AddFavoriteUseCase: Setup = (accountRepository) => async ({ accountId, animeId }) => {
  await accountRepository.checkById({ id: Number(accountId) })
}
