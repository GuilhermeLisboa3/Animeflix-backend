import { AddAnimeController } from '@/application/controllers/anime'
import { RequiredField, AllowedMimeTypeValidation, MaxFileSizeValidation } from '@/application/validation'

describe('AddAnimeController', () => {
  let sut: AddAnimeController
  let file: { buffer: Buffer, mimeType: string }
  let makeRequest: { name: string, categoryId: number, file?: { buffer: Buffer, mimeType: string }, synopsis: string, featured?: boolean }
  let AddAnime: jest.Mock

  beforeAll(() => {
    file = { buffer: Buffer.from('any'), mimeType: 'image/png' }
    makeRequest = { name: 'any_name', categoryId: 1, file, synopsis: 'any_synopsis', featured: true }
    AddAnime = jest.fn()
  })

  beforeEach(() => {
    sut = new AddAnimeController(AddAnime)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('any_name', 'name'),
      new RequiredField(1, 'categoryId'),
      new RequiredField('any_synopsis', 'synopsis'),
      new AllowedMimeTypeValidation(['jpg', 'png'], 'image/png'),
      new MaxFileSizeValidation(6, Buffer.from('any'))
    ])
  })

  it('should call AddAnime with correct input', async () => {
    await sut.perform(makeRequest)

    expect(AddAnime).toHaveBeenCalledWith(makeRequest)
    expect(AddAnime).toHaveBeenCalledTimes(1)
  })
})
