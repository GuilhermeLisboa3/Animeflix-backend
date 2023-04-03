import { UpdateEpisodeController } from '@/application/controllers/episode'
import { RequiredField, AllowedMimeTypeValidation, MaxFileSizeValidation } from '@/application/validation'

describe('UpdateEpisodeController', () => {
  let sut: UpdateEpisodeController
  let file: { buffer: Buffer, mimeType: string }
  let makeRequest: { id: string, name?: string, animeId?: number, order?: number, file?: { buffer: Buffer, mimeType: string }, synopsis?: string, secondsLong?: number}
  let UpdateEpisode: jest.Mock

  beforeAll(() => {
    file = { buffer: Buffer.from('any'), mimeType: 'video/mp4' }
    makeRequest = { id: '1', file }
    UpdateEpisode = jest.fn()
  })

  beforeEach(() => {
    sut = new UpdateEpisodeController(UpdateEpisode)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id'),
      new AllowedMimeTypeValidation(['mp4'], 'video/mp4'),
      new MaxFileSizeValidation(100, Buffer.from('any'))
    ])
  })

  it('should call UpdateEpisode with correct input', async () => {
    await sut.perform(makeRequest)

    expect(UpdateEpisode).toHaveBeenCalledWith(makeRequest)
    expect(UpdateEpisode).toHaveBeenCalledTimes(1)
  })
})
