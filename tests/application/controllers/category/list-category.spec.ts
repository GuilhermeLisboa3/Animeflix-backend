import { ListCategoryController } from '@/application/controllers/category'

describe('ListCategoryController', () => {
  let sut: ListCategoryController
  let makeRequest: { page: string, perPage: string }
  let ListCategory: jest.Mock

  beforeAll(() => {
    makeRequest = { page: '1', perPage: '10' }
    ListCategory = jest.fn()
  })

  beforeEach(() => {
    sut = new ListCategoryController(ListCategory)
  })

  it('should call ListCategory with correct input', async () => {
    await sut.perform(makeRequest)

    expect(ListCategory).toHaveBeenCalledWith(makeRequest)
    expect(ListCategory).toHaveBeenCalledTimes(1)
  })
})
