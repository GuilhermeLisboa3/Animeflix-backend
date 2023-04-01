import { GetAnimeByIdController } from '@/application/controllers/anime'
import { RequiredField } from '@/application/validation'

describe('GetAnimeByIdController', () => {
  let sut: GetAnimeByIdController
  let makeRequest: { id: string }
  let GetAnimeById: jest.Mock

  beforeAll(() => {
    makeRequest = { id: '1' }
    GetAnimeById = jest.fn()
  })

  beforeEach(() => {
    sut = new GetAnimeByIdController(GetAnimeById)
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
})
