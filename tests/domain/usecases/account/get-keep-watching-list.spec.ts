import { GetKeepWatchingListUseCase, KeepWatchingList } from '@/domain/usecases/account'
import { LoadWatchTime, LoadWatchTimeByUserId } from '@/domain/contracts/database/watch-time'
import { LoadEpisodeById } from '@/domain/contracts/database/episode'
import { filterLastEpisodesByAnime } from '@/domain/entities'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadAnimeById } from '@/domain/contracts/database/anime'

jest.mock('@/domain/entities/filter-last-episodes-by-anime-id')

describe('GetKeepWatchingListUseCase', () => {
  let watchTimeRepository: MockProxy<LoadWatchTimeByUserId & LoadWatchTime>
  let episodeRepository: MockProxy<LoadEpisodeById>
  let animeRepository: MockProxy<LoadAnimeById>
  let filterLastEpisodesByAnimeSpy: jest.Mock
  let sut: KeepWatchingList
  let makeAccount: { id: string }
  const makeEpisode = { name: 'any_name', animeId: 1, synopsis: 'any_synopsis', order: 1, videoUrl: 'any_value', id: 1, secondsLong: 100 }

  beforeAll(() => {
    watchTimeRepository = mock()
    watchTimeRepository.loadByUserId.mockResolvedValue([1, 2])
    watchTimeRepository.load.mockResolvedValue({ userId: 1, episodeId: 1, seconds: 10, updatedAt: '2021-04-03' })
    episodeRepository = mock()
    episodeRepository.loadById.mockResolvedValue(makeEpisode)
    animeRepository = mock()
    animeRepository.loadById.mockResolvedValue({ id: 1, name: 'any_name', featured: true, synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnailUrl' })
    filterLastEpisodesByAnimeSpy = jest.fn().mockImplementation(() => ([makeEpisode]))
    jest.mocked(filterLastEpisodesByAnime).mockImplementation(filterLastEpisodesByAnimeSpy)
    makeAccount = { id: '1' }
  })

  beforeEach(() => {
    sut = GetKeepWatchingListUseCase(watchTimeRepository, episodeRepository, animeRepository)
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
    await sut(makeAccount)

    expect(filterLastEpisodesByAnimeSpy).toHaveBeenCalledWith([makeEpisode, makeEpisode])
    expect(filterLastEpisodesByAnimeSpy).toHaveBeenCalledTimes(1)
  })

  it('should call LoadAnimeById with correct input', async () => {
    await sut(makeAccount)

    expect(animeRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(animeRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should call LoadWatchTime with correct input', async () => {
    await sut(makeAccount)

    expect(watchTimeRepository.load).toHaveBeenCalledWith({ userId: '1', episodeId: '1' })
    expect(watchTimeRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should return keep watching list on success', async () => {
    const result = await sut(makeAccount)

    expect(result).toEqual([{
      name: 'any_name',
      animeId: 1,
      synopsis: 'any_synopsis',
      order: 1,
      videoUrl: 'any_value',
      id: 1,
      secondsLong: 100,
      watchTime: { userId: 1, episodeId: 1, seconds: 10, updatedAt: '2021-04-03' },
      anime: { id: 1, name: 'any_name', featured: true, synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnailUrl' }
    }])
  })

  it('should return undefined if LoadWatchTimeByUserId return array empty', async () => {
    watchTimeRepository.loadByUserId.mockResolvedValue([])

    const result = await sut(makeAccount)

    expect(result).toBeUndefined()
  })
})
