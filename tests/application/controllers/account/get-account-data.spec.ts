import { GetAccountDataController } from '@/application/controllers/account'

describe('GetAccountDataController', () => {
  let GetAccountData: jest.Mock
  let sut: GetAccountDataController
  let accountId: string

  beforeAll(() => {
    accountId = 'any_account_id'
    GetAccountData = jest.fn()
  })

  beforeEach(() => {
    sut = new GetAccountDataController(GetAccountData)
  })

  it('should call GetAccountData with correct input', async () => {
    await sut.perform({ accountId })

    expect(GetAccountData).toHaveBeenCalledWith({ id: accountId })
    expect(GetAccountData).toHaveBeenCalledTimes(1)
  })
})
