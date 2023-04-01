import { GetAnimeByIdController } from '@/application/controllers/anime'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { NotFoundError } from '@/domain/errors'

describe('GetAnimeByIdController', () => {
  let sut: GetAnimeByIdController
  let makeRequest: { id: string }
  let GetAnimeById: jest.Mock

  beforeAll(() => {
    makeRequest = { id: '1' }
    GetAnimeById = jest.fn().mockResolvedValue({ id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnailUrl' })
  })

  beforeEach(() => {
    sut = new GetAnimeByIdController(GetAnimeById)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id')
    ])
  })

  it('should call GetAnimeById with correct input', async () => {
    await sut.perform(makeRequest)

    expect(GetAnimeById).toHaveBeenCalledWith({ id: '1' })
    expect(GetAnimeById).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if GetAnimeById returns NotFoundError', async () => {
    GetAnimeById.mockRejectedValueOnce(new NotFoundError('id'))
    const httpResponse = await sut.handle(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new NotFoundError('id')
    })
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnailUrl' }
    })
  })
})
