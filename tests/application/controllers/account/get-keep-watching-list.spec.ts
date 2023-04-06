import { GetKeepWatchingListController } from '@/application/controllers/account'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'

describe('GetKeepWatchingListController', () => {
  let sut: GetKeepWatchingListController
  let makeRequest: { accountId: string }
  let KeepWatchingList: jest.Mock
  beforeAll(() => {
    makeRequest = { accountId: '1' }
    KeepWatchingList = jest.fn().mockResolvedValue({ any: 'any_value' })
  })

  beforeEach(() => {
    sut = new GetKeepWatchingListController(KeepWatchingList)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'accountId')
    ])
  })

  it('should call KeepWatchingList with correct input', async () => {
    await sut.perform(makeRequest)

    expect(KeepWatchingList).toHaveBeenCalledWith({ id: '1' })
    expect(KeepWatchingList).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({ statusCode: 200, data: { any: 'any_value' } })
  })
})
