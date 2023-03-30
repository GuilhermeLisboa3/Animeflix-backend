import { InvalidFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class EmailValidator implements Validator {
  constructor (private readonly email: string, private readonly fieldName: string) {}

  validate (): Error | undefined {
    const validEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/
    if (this.email && !validEmail.test(this.email)) { return new InvalidFieldError(this.fieldName) }
  }
}
