import { DeleteCategoryController } from '@/application/controllers/category'
import { RequiredField } from '@/application/validation'

describe('DeleteCategoryController', () => {
  let sut: DeleteCategoryController
  let makeRequest: { id: string }

  beforeAll(() => {
    makeRequest = { id: '1' }
  })

  beforeEach(() => {
    sut = new DeleteCategoryController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id')
    ])
  })
})
