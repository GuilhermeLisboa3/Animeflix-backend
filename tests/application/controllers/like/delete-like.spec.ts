import { DeleteLikeController } from '@/application/controllers/like'
import { RequiredField } from '@/application/validation'

describe('DeleteLikeController', () => {
  let sut: DeleteLikeController
  let makeRequest: { accountId: string, animeId: string }
  let DeleteLike: jest.Mock

  beforeAll(() => {
    makeRequest = { accountId: '1', animeId: '1' }
    DeleteLike = jest.fn()
  })

  beforeEach(() => {
    sut = new DeleteLikeController(DeleteLike)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId'),
      new RequiredField('1', 'animeId')
    ])
  })

  it('should call DeleteLike with correct input', async () => {
    await sut.perform(makeRequest)

    expect(DeleteLike).toHaveBeenCalledWith({ accountId: '1', animeId: '1' })
    expect(DeleteLike).toHaveBeenCalledTimes(1)
  })
})
