import { GetWatchTimeUseCase, GetWatchTime } from '@/domain/usecases/watch-time'
import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckEpisodeById } from '@/domain/contracts/database/episode'
import { LoadWatchTime } from '@/domain/contracts/database/watch-time'

import { MockProxy, mock } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'

describe('GetWatchTimeUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let episodeRepository: MockProxy<CheckEpisodeById>
  let watchTimeRepository: MockProxy<LoadWatchTime>
  let makeWatchTime: { accountId: string, episodeId: string }
  let sut: GetWatchTime

  beforeAll(() => {
    accountRepository = mock()
    accountRepository.checkById.mockResolvedValue(true)
    makeWatchTime = { accountId: '1', episodeId: '1' }
    episodeRepository = mock()
    episodeRepository.checkById.mockResolvedValue(true)
    watchTimeRepository = mock()
    watchTimeRepository.load.mockResolvedValue({ seconds: 10, userId: 1, episodeId: 1 })
  })

  beforeEach(() => {
    sut = GetWatchTimeUseCase(accountRepository, episodeRepository, watchTimeRepository)
  })

  it('should call CheckAccountById with correct input', async () => {
    await sut(makeWatchTime)

    expect(accountRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(accountRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if CheckAccountById returns false', async () => {
    accountRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(makeWatchTime)

    await expect(promise).rejects.toThrow(new NotFoundError('accountId'))
  })

  it('should rethrow if CheckAccountById throw', async () => {
    const error = new Error('infa_error')
    accountRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut(makeWatchTime)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call CheckEpisodeById with correct input', async () => {
    await sut(makeWatchTime)

    expect(episodeRepository.checkById).toHaveBeenCalledWith({ id: '1' })
    expect(episodeRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if CheckEpisodeById returns false', async () => {
    episodeRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(makeWatchTime)

    await expect(promise).rejects.toThrow(new NotFoundError('episodeId'))
  })

  it('should rethrow if CheckEpisodeById throw', async () => {
    const error = new Error('infa_error')
    episodeRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut(makeWatchTime)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call LoadWatchTime with correct input', async () => {
    await sut(makeWatchTime)

    expect(watchTimeRepository.load).toHaveBeenCalledWith({ userId: '1', episodeId: '1' })
    expect(watchTimeRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if LoadWatchTime throw', async () => {
    const error = new Error('infa_error')
    watchTimeRepository.load.mockRejectedValueOnce(error)

    const promise = sut(makeWatchTime)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return seconds on success', async () => {
    const result = await sut(makeWatchTime)

    expect(result).toEqual({ seconds: 10 })
  })

  it('should return null if watchTime not exists', async () => {
    watchTimeRepository.load.mockResolvedValueOnce(null)

    const result = await sut(makeWatchTime)

    expect(result).toBeNull()
  })
})
