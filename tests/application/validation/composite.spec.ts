import { ValidationComposite, Validator } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Composite', () => {
  let validate1: MockProxy<Validator>
  let validate2: MockProxy<Validator>
  let validateError: Error
  let validations: Validator[]
  let sut: ValidationComposite

  beforeAll(() => {
    validate1 = mock<Validator>()
    validate2 = mock<Validator>()
    validateError = new Error('validate1_error')
    validations = [validate1, validate2]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validations)
  })

  it('should return error if validate fails', () => {
    validate1.validate.mockReturnValue(validateError)

    const error = sut.validate()

    expect(error).toEqual(validateError)
  })
})
