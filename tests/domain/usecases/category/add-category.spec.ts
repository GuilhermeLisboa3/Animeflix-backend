import { AddCategoryUseCase, AddCategory } from '@/domain/usecases/category'
import { CheckCategory } from '@/domain/contracts/database/category'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddCategory', () => {
  let categoryRepository: MockProxy<CheckCategory>
  let category: { name: string, position: number }
  let sut: AddCategory

  beforeAll(() => {
    categoryRepository = mock()
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
})
