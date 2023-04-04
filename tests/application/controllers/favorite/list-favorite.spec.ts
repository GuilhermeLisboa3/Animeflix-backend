import { ListFavoriteController } from '@/application/controllers/favorite'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'

describe('ListFavoriteController', () => {
  let sut: ListFavoriteController
  let makeRequest: { accountId: string }
  let ListFavorite: jest.Mock

  beforeAll(() => {
    makeRequest = { accountId: '1' }
    ListFavorite = jest.fn().mockResolvedValue({ any: 'any_value' })
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  beforeEach(() => {
    sut = new ListFavoriteController(ListFavorite)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId')
    ])
  })

  it('should call ListFavorite with correct input', async () => {
    await sut.perform(makeRequest)

    expect(ListFavorite).toHaveBeenCalledWith({ accountId: '1' })
    expect(ListFavorite).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { any: 'any_value' }
    })
  })
})
