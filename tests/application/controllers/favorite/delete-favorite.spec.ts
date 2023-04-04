import { DeleteFavoriteController } from '@/application/controllers/favorite'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { NotFoundError } from '@/domain/errors'

describe('DeleteFavoriteController', () => {
  let sut: DeleteFavoriteController
  let makeRequest: { accountId: string, animeId: string }
  let DeleteFavorite: jest.Mock

  beforeAll(() => {
    makeRequest = { accountId: '1', animeId: '1' }
    DeleteFavorite = jest.fn()
  })

  beforeEach(() => {
    sut = new DeleteFavoriteController(DeleteFavorite)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId'),
      new RequiredField('1', 'animeId')
    ])
  })

  it('should call DeleteFavorite with correct input', async () => {
    await sut.perform(makeRequest)

    expect(DeleteFavorite).toHaveBeenCalledWith({ accountId: '1', animeId: '1' })
    expect(DeleteFavorite).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if DeleteFavorite returns NotFoundError', async () => {
    DeleteFavorite.mockRejectedValueOnce(new NotFoundError('id'))
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
