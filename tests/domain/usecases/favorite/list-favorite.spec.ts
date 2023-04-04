import { ListFavoriteUseCase, ListFavorite } from '@/domain/usecases/favorite'
import { CheckAccountById } from '@/domain/contracts/database/account'

import { MockProxy, mock } from 'jest-mock-extended'

describe('ListFavoriteUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let makeFavorite: { accountId: string }
  let sut: ListFavorite

  beforeAll(() => {
    makeFavorite = { accountId: '1' }
    accountRepository = mock()
  })

  beforeEach(() => {
    sut = ListFavoriteUseCase(accountRepository)
  })

  it('should call CheckAccountById with correct input', async () => {
    await sut(makeFavorite)

    expect(accountRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(accountRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
