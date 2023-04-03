import { ListAnimeNewestController } from '@/application/controllers/anime'

describe('ListAnimeNewestController', () => {
  let sut: ListAnimeNewestController
  let ListAnimeNewest: jest.Mock

  beforeAll(() => {
    ListAnimeNewest = jest.fn()
  })

  beforeEach(() => {
    sut = new ListAnimeNewestController(ListAnimeNewest)
  })

  it('should call ListAnimeNewest with correct input', async () => {
    await sut.perform()

    expect(ListAnimeNewest).toHaveBeenCalledWith()
    expect(ListAnimeNewest).toHaveBeenCalledTimes(1)
  })
})
