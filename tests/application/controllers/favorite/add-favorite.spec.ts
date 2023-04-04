import { AddFavoriteController } from '@/application/controllers/favorite'
import { RequiredField } from '@/application/validation'

describe('AddFavoriteController', () => {
  let sut: AddFavoriteController
  let makeRequest: { accountId: string, animeId: number }

  beforeAll(() => {
    makeRequest = { accountId: '1', animeId: 1 }
  })

  beforeEach(() => {
    sut = new AddFavoriteController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId'),
      new RequiredField(1, 'animeId')
    ])
  })
})
