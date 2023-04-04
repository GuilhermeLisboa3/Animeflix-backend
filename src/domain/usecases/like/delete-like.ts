import { CheckAccountById } from '@/domain/contracts/database/account'

type Setup = (accountRepository: CheckAccountById) => DeleteLike
type Input = { accountId: string, animeId: string }
export type DeleteLike = (input: Input) => Promise<void>

export const DeleteLikeUseCase: Setup = (accountRepository) => async ({ accountId, animeId }) => {
  await accountRepository.checkById({ id: Number(accountId) })
}
