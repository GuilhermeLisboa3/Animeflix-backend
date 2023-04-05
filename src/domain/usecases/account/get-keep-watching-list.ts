import { LoadWatchTimeByUserId } from '@/domain/contracts/database/watch-time'

type Setup = (watchTimeRepository: LoadWatchTimeByUserId) => KeepWatchingList
type Input = { id: string }
export type KeepWatchingList = (input: Input) => Promise<void>

export const GetKeepWatchingListUseCase: Setup = (watchTimeRepository) => async ({ id }) => {
  await watchTimeRepository.loadByUserId({ userId: id })
}
