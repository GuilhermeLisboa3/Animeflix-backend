import { DeleteAnimeController } from '@/application/controllers/anime'
import { RequiredField } from '@/application/validation'

describe('DeleteAnimeController', () => {
  let sut: DeleteAnimeController
  let makeRequest: { id: string }

  beforeAll(() => {
    makeRequest = { id: '1' }
  })

  beforeEach(() => {
    sut = new DeleteAnimeController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id')
    ])
  })
})
