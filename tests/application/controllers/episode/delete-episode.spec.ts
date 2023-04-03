import { DeleteEpisodeController } from '@/application/controllers/episode'

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

  it('should call DeleteEpisode with correct input', async () => {
    await sut.perform(makeRequest)

    expect(DeleteEpisode).toHaveBeenCalledWith({ episodeId: '1' })
    expect(DeleteEpisode).toHaveBeenCalledTimes(1)
  })
})
