import { SearchAnimesByNameController } from '@/application/controllers/anime'
import { RequiredField } from '@/application/validation'

describe('SearchAnimesByNameController', () => {
  let sut: SearchAnimesByNameController
  let makeRequest: { name: string, page?: string, perPage?: string }

  beforeAll(() => {
    makeRequest = { name: 'any_name' }
  })

  beforeEach(() => {
    sut = new SearchAnimesByNameController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('any_name', 'name')
    ])
  })
})
