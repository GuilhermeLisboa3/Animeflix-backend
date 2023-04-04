import { ListFavoriteController } from '@/application/controllers/favorite'
import { RequiredField } from '@/application/validation'

describe('ListFavoriteController', () => {
  let sut: ListFavoriteController
  let makeRequest: { accountId: string }

  beforeAll(() => {
    makeRequest = { accountId: '1' }
  })

  beforeEach(() => {
    sut = new ListFavoriteController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId')
    ])
  })
})
