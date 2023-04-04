import { DeleteLikeUseCase, DeleteLike } from '@/domain/usecases/like'
import { CheckAccountById } from '@/domain/contracts/database/account'
import { NotFoundError } from '@/domain/errors'
import { CheckAnimeById } from '@/domain/contracts/database/anime'

import { MockProxy, mock } from 'jest-mock-extended'

describe('DeleteLikeUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let animeRepository: MockProxy<CheckAnimeById>
  let makeFavorite: { accountId: string, animeId: string }
  let sut: DeleteLike

  beforeAll(() => {
    makeFavorite = { accountId: '1', animeId: '1' }
    accountRepository = mock()
    accountRepository.checkById.mockResolvedValue(true)
    animeRepository = mock()
  })

  beforeEach(() => {
    sut = DeleteLikeUseCase(accountRepository, animeRepository)
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

  it('should call CheckAnimeById with correct input', async () => {
    await sut(makeFavorite)

    expect(animeRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(animeRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
