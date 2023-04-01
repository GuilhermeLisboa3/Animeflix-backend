import { GetAnimeByIdController } from '@/application/controllers/anime'
import { RequiredField } from '@/application/validation'

describe('GetAnimeByIdController', () => {
  let sut: GetAnimeByIdController
  let makeRequest: { id: string }

  beforeAll(() => {
    makeRequest = { id: '1' }
  })

  beforeEach(() => {
    sut = new GetAnimeByIdController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id')
    ])
  })
})
