import { DeleteLikeUseCase, DeleteLike } from '@/domain/usecases/like'
import { CheckAccountById } from '@/domain/contracts/database/account'
import { NotFoundError } from '@/domain/errors'
import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { DeleteLikeRepository } from '@/domain/contracts/database/like'

import { MockProxy, mock } from 'jest-mock-extended'

describe('DeleteLikeUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let animeRepository: MockProxy<CheckAnimeById>
  let likeRepository: MockProxy<DeleteLikeRepository>
  let makeFavorite: { accountId: string, animeId: string }
  let sut: DeleteLike

  beforeAll(() => {
    makeFavorite = { accountId: '1', animeId: '1' }
    accountRepository = mock()
    accountRepository.checkById.mockResolvedValue(true)
    animeRepository = mock()
    animeRepository.checkById.mockResolvedValue(true)
    likeRepository = mock()
  })

  beforeEach(() => {
    sut = DeleteLikeUseCase(accountRepository, animeRepository, likeRepository)
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

  it('should call DeleteLikeRepository with correct input', async () => {
    await sut(makeFavorite)

    expect(likeRepository.delete).toHaveBeenCalledWith({ userId: 1, animeId: 1 })
    expect(likeRepository.delete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if DeleteLikeRepository throw', async () => {
    const error = new Error('infa_error')
    likeRepository.delete.mockRejectedValueOnce(error)

    const promise = sut(makeFavorite)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return undefined on success', async () => {
    const result = await sut(makeFavorite)

    expect(result).toBeUndefined()
  })
})
