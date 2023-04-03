import { AddEpisodeController } from '@/application/controllers/episode'
import { RequiredField, AllowedMimeTypeValidation, MaxFileSizeValidation } from '@/application/validation'

describe('AddEpisodeController', () => {
  let sut: AddEpisodeController
  let file: { buffer: Buffer, mimeType: string }
  let makeRequest: { name: string, animeId: number, file?: { buffer: Buffer, mimeType: string }, synopsis: string, order: number }

  beforeAll(() => {
    file = { buffer: Buffer.from('any'), mimeType: 'video/mp4' }
    makeRequest = { name: 'any_name', animeId: 1, file, synopsis: 'any_synopsis', order: 1 }
  })

  beforeEach(() => {
    sut = new AddEpisodeController()
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
})
