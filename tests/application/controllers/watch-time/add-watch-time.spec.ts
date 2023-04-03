import { AddWatchTimeController } from '@/application/controllers/watch-time'
import { RequiredField } from '@/application/validation'

describe('AddWatchTimeController', () => {
  let makeRequest: { accountId: string, id: string, seconds: number }
  let sut: AddWatchTimeController

  beforeAll(() => {
    makeRequest = { accountId: '1', id: '1', seconds: 1 }
  })

  beforeEach(() => {
    sut = new AddWatchTimeController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id'),
      new RequiredField(1, 'seconds')
    ])
  })
})
