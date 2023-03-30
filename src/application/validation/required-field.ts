import { Validator } from '@/application/validation/validator'
import { RequiredFieldError } from '@/application/errors'

export class RequiredField implements Validator {
  constructor (
    private readonly value: any,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (!this.value) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
