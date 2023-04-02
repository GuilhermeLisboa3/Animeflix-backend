import { ListAnimeByFeaturedController } from '@/application/controllers/anime'

describe('ListAnimeByFeaturedController', () => {
  let sut: ListAnimeByFeaturedController
  let ListAnimeByFeatured: jest.Mock

  beforeAll(() => {
    ListAnimeByFeatured = jest.fn()
  })

  beforeEach(() => {
    sut = new ListAnimeByFeaturedController(ListAnimeByFeatured)
  })

  it('should call ListAnimeByFeatured with correct input', async () => {
    await sut.perform()

    expect(ListAnimeByFeatured).toHaveBeenCalledWith()
    expect(ListAnimeByFeatured).toHaveBeenCalledTimes(1)
  })
})
