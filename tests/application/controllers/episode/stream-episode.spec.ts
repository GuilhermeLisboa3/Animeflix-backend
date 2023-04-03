import { StreamEpisodeController } from '@/application/controllers/episode'
import { RequiredField } from '@/application/validation'

describe('StreamEpisodeController', () => {
  let sut: StreamEpisodeController
  let makeRequest: { animeId: string, order: string }

  beforeAll(() => {
    makeRequest = { animeId: '1', order: '1' }
  })

  beforeEach(() => {
    sut = new StreamEpisodeController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'order'),
      new RequiredField('1', 'animeId')
    ])
  })
})
