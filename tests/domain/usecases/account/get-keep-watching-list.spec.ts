import { GetKeepWatchingListUseCase, KeepWatchingList } from '@/domain/usecases/account'
import { LoadWatchTimeByUserId } from '@/domain/contracts/database/watch-time'
import { LoadEpisodeById } from '@/domain/contracts/database/episode'
import { filterLastEpisodesByAnime } from '@/domain/entities'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/entities/filter-last-episodes-by-anime-id')

describe('GetKeepWatchingListUseCase', () => {
  let watchTimeRepository: MockProxy<LoadWatchTimeByUserId>
  let episodeRepository: MockProxy<LoadEpisodeById>
  let sut: KeepWatchingList
  let makeAccount: { id: string }
  const makeEpisode = { name: 'any_name', animeId: 1, synopsis: 'any_synopsis', order: 1, videoUrl: 'any_value', id: 1, secondsLong: 100 }

  beforeAll(() => {
    watchTimeRepository = mock()
    watchTimeRepository.loadByUserId.mockResolvedValue([1, 2])
    episodeRepository = mock()
    episodeRepository.loadById.mockResolvedValue(makeEpisode)
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

  it('should call filterLastEpisodesByAnime with correct input', async () => {
    const filterLastEpisodesByAnimeSpy = jest.fn()
    jest.mocked(filterLastEpisodesByAnime).mockImplementationOnce(filterLastEpisodesByAnimeSpy)
    await sut(makeAccount)

    expect(filterLastEpisodesByAnimeSpy).toHaveBeenCalledWith([makeEpisode, makeEpisode])
    expect(filterLastEpisodesByAnimeSpy).toHaveBeenCalledTimes(1)
  })
})
