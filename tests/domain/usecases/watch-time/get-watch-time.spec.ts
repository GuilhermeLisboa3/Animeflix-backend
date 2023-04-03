import { GetWatchTimeUseCase, GetWatchTime } from '@/domain/usecases/watch-time'
import { CheckAccountById } from '@/domain/contracts/database/account'

import { MockProxy, mock } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'

describe('GetWatchTimeUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let makeWatchTime: { accountId: string, episodeId: string }
  let sut: GetWatchTime

  beforeAll(() => {
    accountRepository = mock()
    accountRepository.checkById.mockResolvedValue(true)
    makeWatchTime = { accountId: '1', episodeId: '1' }
  })

  beforeEach(() => {
    sut = GetWatchTimeUseCase(accountRepository)
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
})
