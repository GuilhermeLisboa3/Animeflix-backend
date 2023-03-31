import { GetCategoryController } from '@/application/controllers/category'

describe('GetCategoryController', () => {
  let sut: GetCategoryController
  let makeRequest: { id: string }
  let LoadCategory: jest.Mock

  beforeAll(() => {
    makeRequest = { id: '1' }
    LoadCategory = jest.fn()
  })

  beforeEach(() => {
    sut = new GetCategoryController(LoadCategory)
  })

  it('should call LoadCategory with correct input', async () => {
    await sut.perform(makeRequest)

    expect(LoadCategory).toHaveBeenCalledWith(makeRequest)
    expect(LoadCategory).toHaveBeenCalledTimes(1)
  })
})
