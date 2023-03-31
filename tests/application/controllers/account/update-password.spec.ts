import { UpdatePasswordController } from '@/application/controllers/account'
import { RequiredField } from '@/application/validation'

describe('UpdatePasswordController', () => {
  let sut: UpdatePasswordController
  let makeRequest: { accountId: string, currentPassword: string, newPassword: string }

  beforeAll(() => {
    makeRequest = { accountId: '1', currentPassword: 'current_password', newPassword: 'new_password' }
  })

  beforeEach(() => {
    sut = new UpdatePasswordController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('current_password', 'currentPassword'),
      new RequiredField('new_password', 'newPassword')
    ])
  })
})
