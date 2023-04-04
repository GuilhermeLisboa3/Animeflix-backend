import { AddLikeController } from '@/application/controllers/like'
import { RequiredField } from '@/application/validation'

describe('AddLikeController', () => {
  let sut: AddLikeController
  let makeRequest: { accountId: string, animeId: number }

  beforeAll(() => {
    makeRequest = { accountId: '1', animeId: 1 }
  })

  beforeEach(() => {
    sut = new AddLikeController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId'),
      new RequiredField(1, 'animeId')
    ])
  })
})
