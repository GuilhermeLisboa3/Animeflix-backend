import { GetCategoryUseCase, GetCategory } from '@/domain/usecases/category'
import { LoadCategoryById } from '@/domain/contracts/database/category'
import { LoadAnimesByCategoryId } from '@/domain/contracts/database/anime'
import { NotFoundError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetCategory', () => {
  let categoryRepository: MockProxy<LoadCategoryById>
  let animeRepository: MockProxy<LoadAnimesByCategoryId>
  let category: { id: string }
  let sut: GetCategory

  beforeAll(() => {
    categoryRepository = mock()
    categoryRepository.loadById.mockResolvedValue({ id: 'any_id', name: 'any_name', position: 1 })
    animeRepository = mock()
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

  it('should call LoadAnimesByCategoryId with correct input', async () => {
    await sut(category)

    expect(animeRepository.loadByCategoryId).toHaveBeenCalledWith({ categoryId: '1' })
    expect(animeRepository.loadByCategoryId).toHaveBeenCalledTimes(1)
  })
})
