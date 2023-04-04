import { DeleteFavoriteController } from '@/application/controllers/favorite'
import { RequiredField } from '@/application/validation'

describe('DeleteFavoriteController', () => {
  let sut: DeleteFavoriteController
  let makeRequest: { accountId: string, animeId: string }

  beforeAll(() => {
    makeRequest = { accountId: '1', animeId: '1' }
  })

  beforeEach(() => {
    sut = new DeleteFavoriteController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId'),
      new RequiredField('1', 'animeId')
    ])
  })
})
