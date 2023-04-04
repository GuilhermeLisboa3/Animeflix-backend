import { DeleteLikeController } from '@/application/controllers/like'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { NotFoundError } from '@/domain/errors'

describe('DeleteLikeController', () => {
  let sut: DeleteLikeController
  let makeRequest: { accountId: string, id: string }
  let DeleteLike: jest.Mock

  beforeAll(() => {
    makeRequest = { accountId: '1', id: '1' }
    DeleteLike = jest.fn()
  })

  beforeEach(() => {
    sut = new DeleteLikeController(DeleteLike)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId'),
      new RequiredField('1', 'id')
    ])
  })

  it('should call DeleteLike with correct input', async () => {
    await sut.perform(makeRequest)

    expect(DeleteLike).toHaveBeenCalledWith({ accountId: '1', animeId: '1' })
    expect(DeleteLike).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if DeleteLike returns NotFoundError', async () => {
    DeleteLike.mockRejectedValueOnce(new NotFoundError('id'))
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
