import { AddFavoriteUseCase, AddFavorite } from '@/domain/usecases/favorite'
import { CheckAccountById } from '@/domain/contracts/database/account'

import { MockProxy, mock } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'

describe('AddFavoriteUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let makeFavorite: { accountId: string, animeId: number }
  let sut: AddFavorite

  beforeAll(() => {
    makeFavorite = { accountId: '1', animeId: 1 }
    accountRepository = mock()
    accountRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = AddFavoriteUseCase(accountRepository)
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
})
