import { AddLikeController } from '@/application/controllers/like'
import { RequiredField } from '@/application/validation'

describe('AddLikeController', () => {
  let sut: AddLikeController
  let makeRequest: { accountId: string, animeId: number }
  let AddLike: jest.Mock

  beforeAll(() => {
    makeRequest = { accountId: '1', animeId: 1 }
    AddLike = jest.fn()
  })

  beforeEach(() => {
    sut = new AddLikeController(AddLike)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId'),
      new RequiredField(1, 'animeId')
    ])
  })

  it('should call AddLike with correct input', async () => {
    await sut.perform(makeRequest)

    expect(AddLike).toHaveBeenCalledWith({ accountId: '1', animeId: 1 })
    expect(AddLike).toHaveBeenCalledTimes(1)
  })
})
