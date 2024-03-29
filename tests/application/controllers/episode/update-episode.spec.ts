import { UpdateEpisodeController } from '@/application/controllers/episode'
import { RequiredField, AllowedMimeTypeValidation, MaxFileSizeValidation } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { NotFoundError } from '@/domain/errors'

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

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
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

  it('should return 400 if UpdateEpisode returns NotFoundError', async () => {
    UpdateEpisode.mockRejectedValueOnce(new NotFoundError('id'))
    const httpResponse = await sut.handle(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new NotFoundError('id')
    })
  })

  it('should return 204 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })
})
