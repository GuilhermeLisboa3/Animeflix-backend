import { GetCategoryController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'
import { NotFoundError } from '@/domain/errors'

describe('GetCategoryController', () => {
  let sut: GetCategoryController
  let makeRequest: { id: string }
  let GetCategory: jest.Mock

  beforeAll(() => {
    makeRequest = { id: '1' }
    GetCategory = jest.fn().mockResolvedValue({ id: '1', name: 'any_category', position: 1 })
  })

  beforeEach(() => {
    sut = new GetCategoryController(GetCategory)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call GetCategory with correct input', async () => {
    await sut.perform(makeRequest)

    expect(GetCategory).toHaveBeenCalledWith(makeRequest)
    expect(GetCategory).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if GetCategory returns NotFoundError', async () => {
    GetCategory.mockRejectedValueOnce(new NotFoundError('category'))

    const httpResponse = await sut.handle(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new NotFoundError('category')
    })
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { id: '1', name: 'any_category', position: 1 }
    })
  })
})
