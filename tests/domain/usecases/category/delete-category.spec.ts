import { NotFoundError } from '@/domain/errors'
import { DeleteCategoryUseCase, DeleteCategory } from '@/domain/usecases/category'
import { LoadCategoryById, DeleteCategoryById } from '@/domain/contracts/database/category'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteCategory', () => {
  let categoryRepository: MockProxy<LoadCategoryById & DeleteCategoryById>
  let idCategory: { id: string }
  let sut: DeleteCategory

  beforeAll(() => {
    categoryRepository = mock()
    categoryRepository.loadById.mockResolvedValue({ id: 'any_id', name: 'any_name', position: 1 })
    idCategory = { id: '1' }
  })

  beforeEach(() => {
    sut = DeleteCategoryUseCase(categoryRepository)
  })

  it('should call LoadCategoryById with correct input', async () => {
    await sut(idCategory)

    expect(categoryRepository.loadById).toHaveBeenCalledWith(idCategory)
    expect(categoryRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if LoadCategoryById returns undefined', async () => {
    categoryRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut(idCategory)

    await expect(promise).rejects.toThrow(new NotFoundError('category'))
  })

  it('should call DeleteCategoryById with correct input', async () => {
    await sut(idCategory)

    expect(categoryRepository.delete).toHaveBeenCalledWith(idCategory)
    expect(categoryRepository.delete).toHaveBeenCalledTimes(1)
  })
})
