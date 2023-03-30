import { Validator } from '@/application/validation'

export class ValidationComposite implements Validator {
  constructor (private readonly validations: Validator[]) {}

  validate (): Error | undefined {
    for (const validation of this.validations) {
      const error = validation.validate()
      if (error) return error
    }
  }
}
