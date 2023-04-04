import { DeleteFavoriteUseCase, DeleteFavorite } from '@/domain/usecases/favorite'
import { CheckAccountById } from '@/domain/contracts/database/account'

import { MockProxy, mock } from 'jest-mock-extended'

describe('DeleteFavoriteUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let makeFavorite: { accountId: string, animeId: string }
  let sut: DeleteFavorite

  beforeAll(() => {
    makeFavorite = { accountId: '1', animeId: '1' }
    accountRepository = mock()
  })

  beforeEach(() => {
    sut = DeleteFavoriteUseCase(accountRepository)
  })

  it('should call CheckAccountById with correct input', async () => {
    await sut(makeFavorite)

    expect(accountRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(accountRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
