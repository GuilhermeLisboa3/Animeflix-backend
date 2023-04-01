import { RequiredField, ValidationBuilder, EmailValidator, AllowedMimeTypeValidation, MaxFileSizeValidation } from '@/application/validation'

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

  it('should return a Image validation if image() is call', () => {
    const file = { buffer: Buffer.from('any_value'), mimeType: 'image/png' }
    const validators = ValidationBuilder.of(file, 'any_field_name').image({ AllowedMimeTypes: ['jpg'], maxSizeInMb: 5 }).build()

    expect(validators).toEqual([
      new AllowedMimeTypeValidation(['jpg'], file.mimeType),
      new MaxFileSizeValidation(5, file.buffer)
    ])
  })
})
