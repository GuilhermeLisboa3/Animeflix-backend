import { CheckAccountById } from '@/domain/contracts/database/account'

type Setup = (accountRepository: CheckAccountById) => AddWatchTime
type Input = { accountId: number, episodeId: number, seconds: number }
export type AddWatchTime = (input: Input) => Promise<void>

export const AddWatchTimeUseCase: Setup = (accountRepository) => async ({ accountId, episodeId, seconds }) => {
  await accountRepository.checkById({ id: accountId })
}
