import { GetCategoryUseCase, GetCategory } from '@/domain/usecases/category'
import { LoadCategoryById } from '@/domain/contracts/database/category'
import { LoadAnimesByCategoryId } from '@/domain/contracts/database/anime'

import { mock, MockProxy } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'

describe('GetCategory', () => {
  let categoryRepository: MockProxy<LoadCategoryById>
  let animeRepository: MockProxy<LoadAnimesByCategoryId>
  let category: { id: string }
  let sut: GetCategory

  beforeAll(() => {
    categoryRepository = mock()
    categoryRepository.loadById.mockResolvedValue({ id: 'any_id', name: 'any_name', position: 1 })
    animeRepository = mock()
    animeRepository.loadByCategoryId.mockResolvedValue([{ id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_value' }])
    category = { id: '1' }
  })

  beforeEach(() => {
    sut = GetCategoryUseCase(categoryRepository, animeRepository)
  })

  it('should call LoadCategoryById with correct input', async () => {
    await sut(category)

    expect(categoryRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(categoryRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if LoadCategoryById returns undefined', async () => {
    categoryRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut(category)

    await expect(promise).rejects.toThrow(new NotFoundError('categoryId'))
  })

  it('should rethrow if LoadCategoryById throw', async () => {
    const error = new Error('infa_error')
    categoryRepository.loadById.mockRejectedValueOnce(error)

    const promise = sut(category)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call LoadAnimesByCategoryId with correct input', async () => {
    await sut(category)

    expect(animeRepository.loadByCategoryId).toHaveBeenCalledWith({ categoryId: '1' })
    expect(animeRepository.loadByCategoryId).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if LoadAnimesByCategoryId throw', async () => {
    const error = new Error('infa_error')
    animeRepository.loadByCategoryId.mockRejectedValueOnce(error)

    const promise = sut(category)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return category on success', async () => {
    const result = await sut(category)

    expect(result).toEqual({
      id: 'any_id',
      name: 'any_name',
      position: 1,
      animes: [{ id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_value' }]
    })
  })
})
