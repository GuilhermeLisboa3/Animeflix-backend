import { GetTopTenAnimesByLikesController } from '@/application/controllers/anime'

describe('GetTopTenAnimesByLikesController', () => {
  let sut: GetTopTenAnimesByLikesController
  let TopTenAnimesByLike: jest.Mock

  beforeAll(() => {
    TopTenAnimesByLike = jest.fn()
  })

  beforeEach(() => {
    sut = new GetTopTenAnimesByLikesController(TopTenAnimesByLike)
  })

  it('should call TopTenAnimesByLike with correct input', async () => {
    await sut.perform()

    expect(TopTenAnimesByLike).toHaveBeenCalledWith()
    expect(TopTenAnimesByLike).toHaveBeenCalledTimes(1)
  })
})
