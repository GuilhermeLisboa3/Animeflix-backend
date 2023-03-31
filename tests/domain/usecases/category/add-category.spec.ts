import { AddCategoryUseCase, AddCategory } from '@/domain/usecases/category'
import { CheckCategory, CreateCategory } from '@/domain/contracts/database/category'

import { mock, MockProxy } from 'jest-mock-extended'
import { FieldInUseError } from '@/domain/errors'

describe('AddCategory', () => {
  let categoryRepository: MockProxy<CheckCategory & CreateCategory>
  let category: { name: string, position: number }
  let sut: AddCategory

  beforeAll(() => {
    categoryRepository = mock()
    categoryRepository.check.mockResolvedValue(false)
    category = { name: 'Any_name', position: 1 }
  })

  beforeEach(() => {
    sut = AddCategoryUseCase(categoryRepository)
  })

  it('should call CheckCategory with correct input', async () => {
    await sut(category)

    expect(categoryRepository.check).toHaveBeenCalledWith({ name: 'any_name', position: 1 })
    expect(categoryRepository.check).toHaveBeenCalledTimes(1)
  })

  it('should return FieldInUseError if CheckCategory return true', async () => {
    categoryRepository.check.mockResolvedValueOnce(true)

    const promise = sut(category)

    await expect(promise).rejects.toThrow(new FieldInUseError('name or position'))
  })

  it('should call CreateCategory with correct input', async () => {
    await sut(category)

    expect(categoryRepository.create).toHaveBeenCalledWith({ name: 'any_name', position: 1 })
    expect(categoryRepository.create).toHaveBeenCalledTimes(1)
  })
})
