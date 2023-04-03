import { AddWatchTimeUseCase, AddWatchTime } from '@/domain/usecases/watch-time'
import { CheckAccountById } from '@/domain/contracts/database/account'

import { MockProxy, mock } from 'jest-mock-extended'

describe('AddWatchTimeUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let makeWatchTime: { accountId: number, episodeId: number, seconds: number }
  let sut: AddWatchTime

  beforeAll(() => {
    accountRepository = mock()
    makeWatchTime = { accountId: 1, episodeId: 1, seconds: 1 }
  })

  beforeEach(() => {
    sut = AddWatchTimeUseCase(accountRepository)
  })

  it('should call CheckAccountById with correct input', async () => {
    await sut(makeWatchTime)

    expect(accountRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(accountRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
