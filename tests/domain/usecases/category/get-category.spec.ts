import { GetCategoryUseCase, GetCategory } from '@/domain/usecases/category'
import { LoadCategoryById } from '@/domain/contracts/database/category'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetCategory', () => {
  let categoryRepository: MockProxy<LoadCategoryById>
  let category: { id: string }
  let sut: GetCategory

  beforeAll(() => {
    categoryRepository = mock()
    category = { id: '1' }
  })

  beforeEach(() => {
    sut = GetCategoryUseCase(categoryRepository)
  })

  it('should call LoadCategoryById with correct input', async () => {
    await sut(category)

    expect(categoryRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(categoryRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
