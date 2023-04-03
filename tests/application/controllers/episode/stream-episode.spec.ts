import { StreamEpisodeController } from '@/application/controllers/episode'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'

describe('StreamEpisodeController', () => {
  let sut: StreamEpisodeController
  let makeRequest: { animeId: string, order: string }
  let StreamEpisode: jest.Mock

  beforeAll(() => {
    makeRequest = { animeId: '1', order: '1' }
    StreamEpisode = jest.fn().mockResolvedValue('any_value')
  })

  beforeEach(() => {
    sut = new StreamEpisodeController(StreamEpisode)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
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

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: 'any_value'
    })
  })
})
