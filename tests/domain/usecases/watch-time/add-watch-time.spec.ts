import { AddWatchTimeUseCase, AddWatchTime } from '@/domain/usecases/watch-time'
import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckEpisodeById } from '@/domain/contracts/database/episode'
import { SaveWatchTime } from '@/domain/contracts/database/watch-time'

import { MockProxy, mock } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'

describe('AddWatchTimeUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let episodeRepository: MockProxy<CheckEpisodeById>
  let watchTimeRepository: MockProxy<SaveWatchTime>
  let makeWatchTime: { accountId: number, episodeId: number, seconds: number }
  let sut: AddWatchTime

  beforeAll(() => {
    accountRepository = mock()
    accountRepository.checkById.mockResolvedValue(true)
    makeWatchTime = { accountId: 1, episodeId: 1, seconds: 1 }
    episodeRepository = mock()
    episodeRepository.checkById.mockResolvedValue(true)
    watchTimeRepository = mock()
  })

  beforeEach(() => {
    sut = AddWatchTimeUseCase(accountRepository, episodeRepository, watchTimeRepository)
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

  it('should call SaveWatchTime with correct input', async () => {
    await sut(makeWatchTime)

    expect(watchTimeRepository.save).toHaveBeenCalledWith({ userId: 1, episodeId: 1, seconds: 1 })
    expect(watchTimeRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should return undefined on success', async () => {
    const result = await sut(makeWatchTime)

    expect(result).toBeUndefined()
  })
})
