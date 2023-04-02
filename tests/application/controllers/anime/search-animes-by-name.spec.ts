import { SearchAnimesByNameController } from '@/application/controllers/anime'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'

describe('SearchAnimesByNameController', () => {
  let sut: SearchAnimesByNameController
  let makeRequest: { name: string, page?: string, perPage?: string }
  let ListAnimeByName: jest.Mock

  beforeAll(() => {
    makeRequest = { name: 'any_name' }
    ListAnimeByName = jest.fn().mockResolvedValue({ animes: [], page: 1, perPage: 10, count: 0 })
  })

  beforeEach(() => {
    sut = new SearchAnimesByNameController(ListAnimeByName)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('any_name', 'name')
    ])
  })

  it('should call ListAnimeByName with correct input', async () => {
    await sut.perform(makeRequest)

    expect(ListAnimeByName).toHaveBeenCalledWith({ name: 'any_name' })
    expect(ListAnimeByName).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { animes: [], page: 1, perPage: 10, count: 0 }
    })
  })
})
