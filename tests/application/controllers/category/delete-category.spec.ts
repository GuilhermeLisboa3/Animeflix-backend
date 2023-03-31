import { Controller } from '@/application/controllers'
import { DeleteCategoryController } from '@/application/controllers/category'
import { RequiredField } from '@/application/validation'
import { NotFoundError } from '@/domain/errors'

describe('DeleteCategoryController', () => {
  let sut: DeleteCategoryController
  let makeRequest: { id: string }
  let DeleteCategory: jest.Mock

  beforeAll(() => {
    DeleteCategory = jest.fn()
    makeRequest = { id: '1' }
  })

  beforeEach(() => {
    sut = new DeleteCategoryController(DeleteCategory)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id')
    ])
  })

  it('should call DeleteCategory with correct input', async () => {
    await sut.perform(makeRequest)

    expect(DeleteCategory).toHaveBeenCalledWith(makeRequest)
    expect(DeleteCategory).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if DeleteCategory returns NotFoundError', async () => {
    DeleteCategory.mockRejectedValueOnce(new NotFoundError('category'))

    const httpResponse = await sut.handle(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new NotFoundError('category')
    })
  })

  it('should return 204 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })
})
