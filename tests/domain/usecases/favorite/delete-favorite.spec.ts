import { DeleteFavoriteUseCase, DeleteFavorite } from '@/domain/usecases/favorite'
import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { DeleteFavoriteRepository } from '@/domain/contracts/database/favorite'
import { NotFoundError } from '@/domain/errors'

import { MockProxy, mock } from 'jest-mock-extended'

describe('DeleteFavoriteUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let animeRepository: MockProxy<CheckAnimeById>
  let favoriteRepository: MockProxy<DeleteFavoriteRepository>
  let makeFavorite: { accountId: string, animeId: string }
  let sut: DeleteFavorite

  beforeAll(() => {
    makeFavorite = { accountId: '1', animeId: '1' }
    accountRepository = mock()
    accountRepository.checkById.mockResolvedValue(true)
    animeRepository = mock()
    animeRepository.checkById.mockResolvedValue(true)
    favoriteRepository = mock()
  })

  beforeEach(() => {
    sut = DeleteFavoriteUseCase(accountRepository, animeRepository, favoriteRepository)
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

  it('should rethrow if CheckAccountById throw', async () => {
    const error = new Error('infa_error')
    accountRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut(makeFavorite)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call CheckAnimeById with correct input', async () => {
    await sut(makeFavorite)

    expect(animeRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(animeRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if CheckAnimeById returns false', async () => {
    animeRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(makeFavorite)

    await expect(promise).rejects.toThrow(new NotFoundError('animeId'))
  })

  it('should rethrow if CheckAnimeById throw', async () => {
    const error = new Error('infa_error')
    animeRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut(makeFavorite)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call DeleteFavoriteRepository with correct input', async () => {
    await sut(makeFavorite)

    expect(favoriteRepository.delete).toHaveBeenCalledWith({ userId: 1, animeId: 1 })
    expect(favoriteRepository.delete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if DeleteFavoriteRepository throw', async () => {
    const error = new Error('infa_error')
    favoriteRepository.delete.mockRejectedValueOnce(error)

    const promise = sut(makeFavorite)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return undefined on success', async () => {
    const result = await sut(makeFavorite)

    expect(result).toBeUndefined()
  })
})
