import { badRequest, HttpResponse } from '@/application/helpers'
import { ValidationComposite, Validator } from '@/application/validation'

export abstract class Controller {
  buildValidators (httpRequest: any): Validator[] { return [] }

  async handle (httpRequest: any): Promise<HttpResponse | undefined> {
    const error = this.validate(httpRequest)
    if (error !== undefined) return badRequest(error)
  }

  private validate (httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest)
    return new ValidationComposite(validators).validate()
  }
}
