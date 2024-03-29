import { ListFavoriteUseCase, ListFavorite } from '@/domain/usecases/favorite'
import { CheckAccountById } from '@/domain/contracts/database/account'
import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { ListFavoriteRepository } from '@/domain/contracts/database/favorite'

import { MockProxy, mock } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'

describe('ListFavoriteUseCase', () => {
  let accountRepository: MockProxy<CheckAccountById>
  let favoriteRepository: MockProxy<ListFavoriteRepository>
  let animeRepository: MockProxy<LoadAnimeById>
  let makeFavorite: { accountId: string }
  let sut: ListFavorite

  beforeAll(() => {
    makeFavorite = { accountId: '1' }
    accountRepository = mock()
    accountRepository.checkById.mockResolvedValue(true)
    favoriteRepository = mock()
    favoriteRepository.list.mockResolvedValue([1, 2])
    animeRepository = mock()
    animeRepository.loadById.mockResolvedValue({ id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnailUrl', featured: true })
  })

  beforeEach(() => {
    sut = ListFavoriteUseCase(accountRepository, favoriteRepository, animeRepository)
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

  it('should call ListFavoriteRepository with correct input', async () => {
    await sut(makeFavorite)

    expect(favoriteRepository.list).toHaveBeenCalledWith({ userId: 1 })
    expect(favoriteRepository.list).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ListFavoriteRepository throw', async () => {
    const error = new Error('infa_error')
    favoriteRepository.list.mockRejectedValueOnce(error)

    const promise = sut(makeFavorite)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call LoadAnimeById with correct input', async () => {
    await sut(makeFavorite)

    expect(animeRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(animeRepository.loadById).toHaveBeenCalledWith({ id: '2' })
    expect(animeRepository.loadById).toHaveBeenCalledTimes(2)
  })

  it('should rethrow if LoadAnimeById throw', async () => {
    const error = new Error('infa_error')
    animeRepository.loadById.mockRejectedValueOnce(error)

    const promise = sut(makeFavorite)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return list favorites on success', async () => {
    const result = await sut(makeFavorite)

    expect(result).toEqual({
      accountId: 1,
      animes: [
        { id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnailUrl' },
        { id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnailUrl' }]
    })
  })
})
