import { RequiredField, ValidationBuilder, EmailValidator } from '@/application/validation'

describe('Builder', () => {
  it('should return RequiredField', () => {
    const validators = ValidationBuilder.of('any_value', 'value').required().build()

    expect(validators).toEqual([
      new RequiredField('any_value', 'value')
    ])
  })

  it('should return EmailValidator', () => {
    const validators = ValidationBuilder.of('any_email', 'email').required().email().build()

    expect(validators).toEqual([
      new RequiredField('any_email', 'email'),
      new EmailValidator('any_email', 'email')
    ])
  })
})
