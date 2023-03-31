import { UpdatePasswordController } from '@/application/controllers/account'
import { RequiredField } from '@/application/validation'

describe('UpdatePasswordController', () => {
  let sut: UpdatePasswordController
  let makeRequest: { accountId: string, currentPassword: string, newPassword: string }
  let UpdateAccount: jest.Mock

  beforeAll(() => {
    makeRequest = { accountId: '1', currentPassword: 'current_password', newPassword: 'new_password' }
    UpdateAccount = jest.fn()
  })

  beforeEach(() => {
    sut = new UpdatePasswordController(UpdateAccount)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('current_password', 'currentPassword'),
      new RequiredField('new_password', 'newPassword')
    ])
  })

  it('should call UpdateAccount with correct input', async () => {
    await sut.perform(makeRequest)

    expect(UpdateAccount).toHaveBeenCalledWith(makeRequest)
    expect(UpdateAccount).toHaveBeenCalledTimes(1)
  })
})
