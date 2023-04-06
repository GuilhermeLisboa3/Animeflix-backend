import { GetKeepWatchingListController } from '@/application/controllers/account'
import { RequiredField } from '@/application/validation'

describe('GetKeepWatchingListController', () => {
  let sut: GetKeepWatchingListController
  let makeRequest: { accountId: string }
  beforeAll(() => {
    makeRequest = { accountId: '1' }
  })

  beforeEach(() => {
    sut = new GetKeepWatchingListController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId')
    ])
  })
})
