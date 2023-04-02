import { ListAnimeByFeaturedController } from '@/application/controllers/anime'

describe('ListAnimeByFeaturedController', () => {
  let sut: ListAnimeByFeaturedController
  let ListAnimeByFeatured: jest.Mock

  beforeAll(() => {
    ListAnimeByFeatured = jest.fn().mockResolvedValue([{ id: 1, name: 'any_name', thumbnailUrl: 'any_thumbnail', synopsis: 'any_synopsis' }])
  })

  beforeEach(() => {
    sut = new ListAnimeByFeaturedController(ListAnimeByFeatured)
  })

  it('should call ListAnimeByFeatured with correct input', async () => {
    await sut.perform()

    expect(ListAnimeByFeatured).toHaveBeenCalledWith()
    expect(ListAnimeByFeatured).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform()

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [{ id: 1, name: 'any_name', thumbnailUrl: 'any_thumbnail', synopsis: 'any_synopsis' }]
    })
  })
})
