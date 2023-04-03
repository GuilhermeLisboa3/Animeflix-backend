import { ListAnimeNewestController } from '@/application/controllers/anime'

describe('ListAnimeNewestController', () => {
  let sut: ListAnimeNewestController
  let ListAnimeNewest: jest.Mock

  beforeAll(() => {
    ListAnimeNewest = jest.fn().mockResolvedValue([{ id: 1, name: 'any_name', categoryId: 1, synopsis: 'any_synopsis', featured: false, thumbnailUrl: null }])
  })

  beforeEach(() => {
    sut = new ListAnimeNewestController(ListAnimeNewest)
  })

  it('should call ListAnimeNewest with correct input', async () => {
    await sut.perform()

    expect(ListAnimeNewest).toHaveBeenCalledWith()
    expect(ListAnimeNewest).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform()

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [{ id: 1, name: 'any_name', categoryId: 1, synopsis: 'any_synopsis', featured: false, thumbnailUrl: null }]
    })
  })
})
