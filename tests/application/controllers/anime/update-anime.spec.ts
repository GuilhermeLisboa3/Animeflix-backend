import { UpdateAnimeController } from '@/application/controllers/anime'
import { RequiredField, AllowedMimeTypeValidation, MaxFileSizeValidation } from '@/application/validation'

describe('UpdateAnimeController', () => {
  let sut: UpdateAnimeController
  let file: { buffer: Buffer, mimeType: string }
  let makeRequest: { id: string, file?: { buffer: Buffer, mimeType: string } }

  beforeAll(() => {
    file = { buffer: Buffer.from('any'), mimeType: 'image/png' }
    makeRequest = { id: '1', file }
  })

  beforeEach(() => {
    sut = new UpdateAnimeController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id'),
      new AllowedMimeTypeValidation(['jpg', 'png'], 'image/png'),
      new MaxFileSizeValidation(6, Buffer.from('any'))
    ])
  })
})
