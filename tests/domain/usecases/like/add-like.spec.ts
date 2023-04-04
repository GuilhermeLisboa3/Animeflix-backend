import { AddLikeUseCase, AddLike } from '@/domain/usecases/like'
import { CheckAccountById } from '@/domain/contracts/database/account'

import { MockProxy, mock } from 'jest-mock-extended'

describe('AddLikeUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let makeFavorite: { accountId: string, animeId: number }
  let sut: AddLike

  beforeAll(() => {
    makeFavorite = { accountId: '1', animeId: 1 }
    accountRepository = mock()
  })

  beforeEach(() => {
    sut = AddLikeUseCase(accountRepository)
  })

  it('should call CheckAccountById with correct input', async () => {
    await sut(makeFavorite)

    expect(accountRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(accountRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
