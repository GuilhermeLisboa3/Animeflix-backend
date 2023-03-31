import { GetAccountDataController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers'

describe('GetAccountDataController', () => {
  let GetAccountData: jest.Mock
  let sut: GetAccountDataController
  let accountId: string
  let account: object

  beforeAll(() => {
    accountId = 'any_account_id'
    account = {
      firstName: 'any_name',
      lastName: 'any_last_name',
      email: 'any_email',
      password: 'account_password',
      birth: new Date(),
      phone: 'any_phone',
      role: 'user'
    }
    GetAccountData = jest.fn().mockResolvedValue(account)
  })

  beforeEach(() => {
    sut = new GetAccountDataController(GetAccountData)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call GetAccountData with correct input', async () => {
    await sut.perform({ accountId })

    expect(GetAccountData).toHaveBeenCalledWith({ id: accountId })
    expect(GetAccountData).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform({ accountId })

    expect(httpResponse).toEqual({ statusCode: 200, data: account })
  })
})
