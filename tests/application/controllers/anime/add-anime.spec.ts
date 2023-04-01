import { Controller } from '@/application/controllers'
import { AddAnimeController } from '@/application/controllers/anime'
import { RequiredField, AllowedMimeTypeValidation, MaxFileSizeValidation } from '@/application/validation'
import { FieldInUseError } from '@/domain/errors'

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

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
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

  it('should return 400 if AddAnime returns FieldInUseError', async () => {
    AddAnime.mockRejectedValueOnce(new FieldInUseError('name'))
    const httpResponse = await sut.handle(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new FieldInUseError('name')
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
