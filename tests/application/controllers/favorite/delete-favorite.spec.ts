import { DeleteFavoriteController } from '@/application/controllers/favorite'
import { RequiredField } from '@/application/validation'

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
})
