import { SearchAnimesByNameController } from '@/application/controllers/anime'
import { RequiredField } from '@/application/validation'

describe('SearchAnimesByNameController', () => {
  let sut: SearchAnimesByNameController
  let makeRequest: { name: string, page?: string, perPage?: string }
  let ListAnimeByName: jest.Mock

  beforeAll(() => {
    makeRequest = { name: 'any_name' }
    ListAnimeByName = jest.fn()
  })

  beforeEach(() => {
    sut = new SearchAnimesByNameController(ListAnimeByName)
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
})
