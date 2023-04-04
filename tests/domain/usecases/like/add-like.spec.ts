import { AddLikeUseCase, AddLike } from '@/domain/usecases/like'
import { CheckAccountById } from '@/domain/contracts/database/account'
import { NotFoundError } from '@/domain/errors'
import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { CreateLike } from '@/domain/contracts/database/like'

import { MockProxy, mock } from 'jest-mock-extended'

describe('AddLikeUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let animeRepository: MockProxy<CheckAnimeById>
  let likeRepository: MockProxy<CreateLike>
  let makeFavorite: { accountId: string, animeId: number }
  let sut: AddLike

  beforeAll(() => {
    makeFavorite = { accountId: '1', animeId: 1 }
    accountRepository = mock()
    accountRepository.checkById.mockResolvedValue(true)
    animeRepository = mock()
    animeRepository.checkById.mockResolvedValue(true)
    likeRepository = mock()
  })

  beforeEach(() => {
    sut = AddLikeUseCase(accountRepository, animeRepository, likeRepository)
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

  it('should return NotFoundError if CheckAnimeById returns false', async () => {
    animeRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(makeFavorite)

    await expect(promise).rejects.toThrow(new NotFoundError('animeId'))
  })

  it('should call CreateLike with correct input', async () => {
    await sut(makeFavorite)

    expect(likeRepository.create).toHaveBeenCalledWith({ userId: 1, animeId: 1 })
    expect(likeRepository.create).toHaveBeenCalledTimes(1)
  })
})
