import { AddLikeController } from '@/application/controllers/like'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { NotFoundError } from '@/domain/errors'

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

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
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

  it('should return 400 if AddLike returns NotFoundError', async () => {
    AddLike.mockRejectedValueOnce(new NotFoundError('id'))
    const httpResponse = await sut.handle(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new NotFoundError('id')
    })
  })

  it('should return 204 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })
})
