import { GetKeepWatchingListUseCase, KeepWatchingList } from '@/domain/usecases/account'
import { LoadWatchTimeByUserId } from '@/domain/contracts/database/watch-time'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetKeepWatchingListUseCase', () => {
  let watchTimeRepository: MockProxy<LoadWatchTimeByUserId>
  let sut: KeepWatchingList
  let makeAccount: { id: string }

  beforeAll(() => {
    watchTimeRepository = mock()
    makeAccount = { id: '1' }
  })

  beforeEach(() => {
    sut = GetKeepWatchingListUseCase(watchTimeRepository)
  })

  it('should call LoadWatchTimeByUserId with correct email', async () => {
    await sut(makeAccount)

    expect(watchTimeRepository.loadByUserId).toHaveBeenCalledWith({ userId: '1' })
    expect(watchTimeRepository.loadByUserId).toHaveBeenCalledTimes(1)
  })
})
