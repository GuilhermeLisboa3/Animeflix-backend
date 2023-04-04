import { GetCategoryController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'

describe('GetCategoryController', () => {
  let sut: GetCategoryController
  let makeRequest: { id: string }
  let LoadCategory: jest.Mock

  beforeAll(() => {
    makeRequest = { id: '1' }
    LoadCategory = jest.fn().mockResolvedValue({ id: '1', name: 'any_category', position: 1 })
  })

  beforeEach(() => {
    sut = new GetCategoryController(LoadCategory)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call LoadCategory with correct input', async () => {
    await sut.perform(makeRequest)

    expect(LoadCategory).toHaveBeenCalledWith(makeRequest)
    expect(LoadCategory).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { id: '1', name: 'any_category', position: 1 }
    })
  })
})
