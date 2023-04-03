import { GetWatchTimeController } from '@/application/controllers/watch-time'
import { RequiredField } from '@/application/validation'

describe('GetWatchTimeController', () => {
  let makeRequest: { accountId: string, id: string}
  let sut: GetWatchTimeController
  let GetWatchTime: jest.Mock

  beforeAll(() => {
    makeRequest = { accountId: '1', id: '1' }
    GetWatchTime = jest.fn()
  })

  beforeEach(() => {
    sut = new GetWatchTimeController(GetWatchTime)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id')
    ])
  })

  it('should call GetWatchTime with correct input', async () => {
    await sut.perform(makeRequest)

    expect(GetWatchTime).toHaveBeenCalledWith({ accountId: '1', episodeId: '1' })
    expect(GetWatchTime).toHaveBeenCalledTimes(1)
  })
})
