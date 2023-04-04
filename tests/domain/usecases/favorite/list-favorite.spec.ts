import { ListFavoriteUseCase, ListFavorite } from '@/domain/usecases/favorite'
import { CheckAccountById } from '@/domain/contracts/database/account'
import { ListFavoriteRepository } from '@/domain/contracts/database/favorite'

import { MockProxy, mock } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'

describe('ListFavoriteUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let favoriteRepository: MockProxy<ListFavoriteRepository>
  let makeFavorite: { accountId: string }
  let sut: ListFavorite

  beforeAll(() => {
    makeFavorite = { accountId: '1' }
    accountRepository = mock()
    accountRepository.checkById.mockResolvedValue(true)
    favoriteRepository = mock()
  })

  beforeEach(() => {
    sut = ListFavoriteUseCase(accountRepository, favoriteRepository)
  })

  it('should call CheckAccountById with correct input', async () => {
    await sut(makeFavorite)

    expect(accountRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(accountRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if CheckAccountById returns false', async () => {
    accountRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(makeFavorite)

    await expect(promise).rejects.toThrow(new NotFoundError('accountId'))
  })

  it('should call ListFavoriteRepository with correct input', async () => {
    await sut(makeFavorite)

    expect(favoriteRepository.list).toHaveBeenCalledWith({ userId: 1 })
    expect(favoriteRepository.list).toHaveBeenCalledTimes(1)
  })
})
