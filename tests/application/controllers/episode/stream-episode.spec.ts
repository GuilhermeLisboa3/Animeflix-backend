import { StreamEpisodeController } from '@/application/controllers/episode'
import { RequiredField } from '@/application/validation'

describe('StreamEpisodeController', () => {
  let sut: StreamEpisodeController
  let makeRequest: { animeId: string, order: string }
  let StreamEpisode: jest.Mock

  beforeAll(() => {
    makeRequest = { animeId: '1', order: '1' }
    StreamEpisode = jest.fn()
  })

  beforeEach(() => {
    sut = new StreamEpisodeController(StreamEpisode)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'order'),
      new RequiredField('1', 'animeId')
    ])
  })

  it('should call StreamEpisode with correct input', async () => {
    await sut.perform(makeRequest)

    expect(StreamEpisode).toHaveBeenCalledWith(makeRequest)
    expect(StreamEpisode).toHaveBeenCalledTimes(1)
  })
})
