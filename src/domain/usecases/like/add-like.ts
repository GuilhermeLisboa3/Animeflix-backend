import { CheckAccountById } from '@/domain/contracts/database/account'

type Setup = (accountRepository: CheckAccountById) => AddLike
type Input = { accountId: string, animeId: number}
export type AddLike = (input: Input) => Promise<void>

export const AddLikeUseCase: Setup = (accountRepository) => async ({ accountId, animeId }) => {
  await accountRepository.checkById({ id: Number(accountId) })
}
