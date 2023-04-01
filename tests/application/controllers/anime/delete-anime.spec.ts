import { DeleteAnimeController } from '@/application/controllers/anime'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'

describe('DeleteAnimeController', () => {
  let sut: DeleteAnimeController
  let makeRequest: { id: string }
  let DeleteAnime: jest.Mock

  beforeAll(() => {
    makeRequest = { id: '1' }
    DeleteAnime = jest.fn()
  })

  beforeEach(() => {
    sut = new DeleteAnimeController(DeleteAnime)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id')
    ])
  })

  it('should call DeleteAnime with correct input', async () => {
    await sut.perform(makeRequest)

    expect(DeleteAnime).toHaveBeenCalledWith({ id: '1' })
    expect(DeleteAnime).toHaveBeenCalledTimes(1)
  })

  it('should return 204 on success', async () => {
    const result = await sut.perform(makeRequest)

    expect(result).toEqual({
      statusCode: 204,
      data: null
    })
  })
})
