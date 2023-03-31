import { AddCategoryController } from '@/application/controllers/category'
import { RequiredField } from '@/application/validation'

describe('AddCategoryController', () => {
  let sut: AddCategoryController
  let makeRequest: { name: string, position: number }

  beforeAll(() => {
    makeRequest = { name: 'any_name', position: 1 }
  })

  beforeEach(() => {
    sut = new AddCategoryController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('any_name', 'name'),
      new RequiredField(1, 'position')
    ])
  })
})
