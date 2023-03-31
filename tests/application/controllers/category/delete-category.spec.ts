import { DeleteCategoryController } from '@/application/controllers/category'
import { RequiredField } from '@/application/validation'

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
})
