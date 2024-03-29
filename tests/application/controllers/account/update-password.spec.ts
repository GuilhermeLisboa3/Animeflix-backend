import { UpdatePasswordController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers'
import { RequiredField } from '@/application/validation'
import { CompareFieldsError } from '@/domain/errors'

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

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
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

  it('should return 400 if UpdateAccount returns CompareFieldsError', async () => {
    UpdateAccount.mockRejectedValueOnce(new CompareFieldsError('currentPassword', 'password'))

    const httpResponse = await sut.handle(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new CompareFieldsError('currentPassword', 'password')
    })
  })

  it('should return 204 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({ statusCode: 204, data: null })
  })
})
