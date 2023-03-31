import { ListCategoryController } from '@/application/controllers/category'

describe('ListCategoryController', () => {
  let sut: ListCategoryController
  let makeRequest: { page: string, perPage: string }
  let ListCategory: jest.Mock

  beforeAll(() => {
    makeRequest = { page: '1', perPage: '10' }
    ListCategory = jest.fn().mockResolvedValue({ categories: [], page: 1, perPage: 10, count: 0 })
  })

  beforeEach(() => {
    sut = new ListCategoryController(ListCategory)
  })

  it('should call ListCategory with correct input', async () => {
    await sut.perform(makeRequest)

    expect(ListCategory).toHaveBeenCalledWith(makeRequest)
    expect(ListCategory).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        categories: [],
        page: 1,
        perPage: 10,
        count: 0
      }
    })
  })
})
