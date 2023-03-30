import { RequiredField, Validator, EmailValidator } from '@/application/validation'

export class ValidationBuilder {
  private constructor (
    private readonly value: any,
    private readonly fieldName: string,
    private readonly validations: Validator[] = []
  ) {}

  static of (value: any, fieldName: string): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredField(this.value, this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validations
  }
}
