import { GetTopTenAnimesByLikesController } from '@/application/controllers/anime'
import { Controller } from '@/application/controllers'

describe('GetTopTenAnimesByLikesController', () => {
  let sut: GetTopTenAnimesByLikesController
  let TopTenAnimesByLike: jest.Mock

  beforeAll(() => {
    TopTenAnimesByLike = jest.fn().mockResolvedValue({ any: 'any_value' })
  })

  beforeEach(() => {
    sut = new GetTopTenAnimesByLikesController(TopTenAnimesByLike)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call TopTenAnimesByLike with correct input', async () => {
    await sut.perform()

    expect(TopTenAnimesByLike).toHaveBeenCalledWith()
    expect(TopTenAnimesByLike).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const result = await sut.perform()

    expect(result).toEqual({
      statusCode: 200,
      data: { any: 'any_value' }
    })
  })
})
