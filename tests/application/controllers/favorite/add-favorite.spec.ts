import { AddFavoriteController } from '@/application/controllers/favorite'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'

describe('AddFavoriteController', () => {
  let sut: AddFavoriteController
  let makeRequest: { accountId: string, animeId: number }
  let AddFavorite: jest.Mock

  beforeAll(() => {
    makeRequest = { accountId: '1', animeId: 1 }
    AddFavorite = jest.fn()
  })

  beforeEach(() => {
    sut = new AddFavoriteController(AddFavorite)
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

  it('should call AddFavorite with correct input', async () => {
    await sut.perform(makeRequest)

    expect(AddFavorite).toHaveBeenCalledWith({ accountId: '1', animeId: 1 })
    expect(AddFavorite).toHaveBeenCalledTimes(1)
  })

  it('should return 204 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })
})
