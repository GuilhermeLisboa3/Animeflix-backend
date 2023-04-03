import { GetWatchTimeController } from '@/application/controllers/watch-time'
import { RequiredField } from '@/application/validation'

describe('GetWatchTimeController', () => {
  let makeRequest: { accountId: string, id: string}
  let sut: GetWatchTimeController

  beforeAll(() => {
    makeRequest = { accountId: '1', id: '1' }
  })

  beforeEach(() => {
    sut = new GetWatchTimeController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id')
    ])
  })
})
