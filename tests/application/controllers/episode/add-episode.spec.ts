import { AddEpisodeController } from '@/application/controllers/episode'
import { RequiredField, AllowedMimeTypeValidation, MaxFileSizeValidation } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { NotFoundError } from '@/domain/errors'

describe('AddEpisodeController', () => {
  let sut: AddEpisodeController
  let file: { buffer: Buffer, mimeType: string }
  let makeRequest: { name: string, animeId: number, file?: { buffer: Buffer, mimeType: string }, synopsis: string, order: number }
  let AddEpisode: jest.Mock

  beforeAll(() => {
    file = { buffer: Buffer.from('any'), mimeType: 'video/mp4' }
    makeRequest = { name: 'any_name', animeId: 1, file, synopsis: 'any_synopsis', order: 1 }
    AddEpisode = jest.fn()
  })

  beforeEach(() => {
    sut = new AddEpisodeController(AddEpisode)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('any_name', 'name'),
      new RequiredField(1, 'animeId'),
      new RequiredField('any_synopsis', 'synopsis'),
      new RequiredField(1, 'order'),
      new AllowedMimeTypeValidation(['mp4'], 'video/mp4'),
      new MaxFileSizeValidation(100, Buffer.from('any'))
    ])
  })

  it('should call AddEpisode with correct input', async () => {
    await sut.perform(makeRequest)

    expect(AddEpisode).toHaveBeenCalledWith(makeRequest)
    expect(AddEpisode).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if AddEpisode returns NotFoundError', async () => {
    AddEpisode.mockRejectedValueOnce(new NotFoundError('animeId'))
    const httpResponse = await sut.handle(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new NotFoundError('animeId')
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
