import { DeleteEpisodeController } from '@/application/controllers/episode'
import { Controller } from '@/application/controllers'

describe('DeleteEpisodeController', () => {
  let sut: DeleteEpisodeController
  let makeRequest: { id: string }
  let DeleteEpisode: jest.Mock

  beforeAll(() => {
    makeRequest = { id: '1' }
    DeleteEpisode = jest.fn()
  })

  beforeEach(() => {
    sut = new DeleteEpisodeController(DeleteEpisode)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call DeleteEpisode with correct input', async () => {
    await sut.perform(makeRequest)

    expect(DeleteEpisode).toHaveBeenCalledWith({ episodeId: '1' })
    expect(DeleteEpisode).toHaveBeenCalledTimes(1)
  })

  it('should return 204 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })
})
