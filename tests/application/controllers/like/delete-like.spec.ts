import { DeleteLikeController } from '@/application/controllers/like'
import { RequiredField } from '@/application/validation'

describe('DeleteLikeController', () => {
  let sut: DeleteLikeController
  let makeRequest: { accountId: string, animeId: string }

  beforeAll(() => {
    makeRequest = { accountId: '1', animeId: '1' }
  })

  beforeEach(() => {
    sut = new DeleteLikeController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId'),
      new RequiredField('1', 'animeId')
    ])
  })
})
