import { UpdateAnimeController } from '@/application/controllers/anime'
import { RequiredField, AllowedMimeTypeValidation, MaxFileSizeValidation } from '@/application/validation'

describe('UpdateAnimeController', () => {
  let sut: UpdateAnimeController
  let file: { buffer: Buffer, mimeType: string }
  let makeRequest: { id: string, file?: { buffer: Buffer, mimeType: string } }
  let UpdateAnime: jest.Mock

  beforeAll(() => {
    file = { buffer: Buffer.from('any'), mimeType: 'image/png' }
    makeRequest = { id: '1', file }
    UpdateAnime = jest.fn()
  })

  beforeEach(() => {
    sut = new UpdateAnimeController(UpdateAnime)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id'),
      new AllowedMimeTypeValidation(['jpg', 'png'], 'image/png'),
      new MaxFileSizeValidation(6, Buffer.from('any'))
    ])
  })

  it('should call UpdateAnime with correct input', async () => {
    await sut.perform(makeRequest)

    expect(UpdateAnime).toHaveBeenCalledWith(makeRequest)
    expect(UpdateAnime).toHaveBeenCalledTimes(1)
  })

  it('should return 204 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })
})
