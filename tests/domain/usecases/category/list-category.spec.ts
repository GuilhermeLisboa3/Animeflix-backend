import { PaginationParams } from '@/domain/entities'
import { ListCategoryUseCase, ListCategory } from '@/domain/usecases/category'
import { ListAllCategories } from '@/domain/contracts/database/category'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/entities/pagination-params')

describe('ListCategory', () => {
  let categoryRepository: MockProxy<ListAllCategories>
  let pagination: { page: string, perPage: string }
  let sut: ListCategory

  beforeAll(() => {
    pagination = { page: '1', perPage: '10' }
    categoryRepository = mock()
    categoryRepository.list.mockResolvedValue({ categories: [], page: 1, perPage: 10, count: 0 })
  })

  beforeEach(() => {
    sut = ListCategoryUseCase(categoryRepository)
  })

  it('should call ListAllCategories with PaginationParams', async () => {
    jest.mocked(PaginationParams).mockImplementationOnce(jest.fn().mockImplementationOnce(() => {
      return { pageNumber: 1, perPageNumber: 10 }
    }))
    await sut(pagination)

    expect(categoryRepository.list).toHaveBeenCalledWith({ page: 1, perPage: 10 })
    expect(categoryRepository.list).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ListAllCategories throw', async () => {
    const error = new Error('infa_error')
    categoryRepository.list.mockRejectedValueOnce(error)

    const promise = sut(pagination)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return list category on success', async () => {
    const listCategories = await sut(pagination)

    expect(listCategories).toEqual({ categories: [], page: 1, perPage: 10, count: 0 })
  })
})
