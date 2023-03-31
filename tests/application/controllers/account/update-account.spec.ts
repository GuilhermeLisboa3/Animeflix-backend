import { UpdateAccountController } from '@/application/controllers/account'

describe('UpdateAccountController', () => {
  let sut: UpdateAccountController
  let makeRequest: { accountId: string, firstName: string }
  let UpdateAccount: jest.Mock

  beforeAll(() => {
    makeRequest = { accountId: '1', firstName: 'any_name' }
    UpdateAccount = jest.fn()
  })

  beforeEach(() => {
    sut = new UpdateAccountController(UpdateAccount)
  })

  it('should call UpdateAccount with correct input', async () => {
    await sut.perform(makeRequest)

    expect(UpdateAccount).toHaveBeenCalledWith(makeRequest)
    expect(UpdateAccount).toHaveBeenCalledTimes(1)
  })
})
