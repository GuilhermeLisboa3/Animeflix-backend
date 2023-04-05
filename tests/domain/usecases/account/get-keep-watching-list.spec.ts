import { GetKeepWatchingListUseCase, KeepWatchingList } from '@/domain/usecases/account'
import { LoadWatchTimeByUserId } from '@/domain/contracts/database/watch-time'
import { LoadEpisodeById } from '@/domain/contracts/database/episode'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetKeepWatchingListUseCase', () => {
  let watchTimeRepository: MockProxy<LoadWatchTimeByUserId>
  let episodeRepository: MockProxy<LoadEpisodeById>
  let sut: KeepWatchingList
  let makeAccount: { id: string }

  beforeAll(() => {
    watchTimeRepository = mock()
    watchTimeRepository.loadByUserId.mockResolvedValue([1, 2])
    episodeRepository = mock()
    makeAccount = { id: '1' }
  })

  beforeEach(() => {
    sut = GetKeepWatchingListUseCase(watchTimeRepository, episodeRepository)
  })

  it('should call LoadWatchTimeByUserId with correct input', async () => {
    await sut(makeAccount)

    expect(watchTimeRepository.loadByUserId).toHaveBeenCalledWith({ userId: '1' })
    expect(watchTimeRepository.loadByUserId).toHaveBeenCalledTimes(1)
  })

  it('should call LoadEpisodeById with correct input', async () => {
    await sut(makeAccount)

    expect(episodeRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(episodeRepository.loadById).toHaveBeenCalledWith({ id: '2' })
    expect(episodeRepository.loadById).toHaveBeenCalledTimes(2)
  })
})
