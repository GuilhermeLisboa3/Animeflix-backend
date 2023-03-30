import { RequiredField } from '@/application/validation'
import { RequiredFieldError } from '@/application/errors'

describe('RequiredField', () => {
  it('should return RequiredFieldError if value is empty', () => {
    const sut = new RequiredField('', 'value')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('value'))
  })

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiredField(undefined, 'value')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('value'))
  })

  it('should return RequiredFieldError if value is null', () => {
    const sut = new RequiredField(null, 'value')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('value'))
  })
})
