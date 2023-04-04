import { CheckAccountById } from '@/domain/contracts/database/account'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById) => AddLike
type Input = { accountId: string, animeId: number}
export type AddLike = (input: Input) => Promise<void>

export const AddLikeUseCase: Setup = (accountRepository) => async ({ accountId, animeId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
}
