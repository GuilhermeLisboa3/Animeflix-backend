import { CheckAccountById } from '@/domain/contracts/database/account'

type Setup = (accountRepository: CheckAccountById) => DeleteFavorite
type Input = { accountId: string, animeId: string}
export type DeleteFavorite = (input: Input) => Promise<void>

export const DeleteFavoriteUseCase: Setup = (accountRepository) => async ({ accountId, animeId }) => {
  await accountRepository.checkById({ id: Number(accountId) })
}
