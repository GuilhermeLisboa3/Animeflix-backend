import { AddCategoryController } from '@/application/controllers/category'
import { RequiredField } from '@/application/validation'

describe('AddCategoryController', () => {
  let sut: AddCategoryController
  let makeRequest: { name: string, position: number }
  let AddCategory: jest.Mock

  beforeAll(() => {
    makeRequest = { name: 'any_name', position: 1 }
    AddCategory = jest.fn()
  })

  beforeEach(() => {
    sut = new AddCategoryController(AddCategory)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('any_name', 'name'),
      new RequiredField(1, 'position')
    ])
  })

  it('should call AddCategory with correct input', async () => {
    await sut.perform(makeRequest)

    expect(AddCategory).toHaveBeenCalledWith(makeRequest)
    expect(AddCategory).toHaveBeenCalledTimes(1)
  })

  it('should return 204 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({ statusCode: 204, data: null })
  })
})
