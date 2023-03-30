import { badRequest, HttpResponse, serverError, unauthorized } from '@/application/helpers'
import { ValidationComposite, Validator } from '@/application/validation'
import { AuthenticationError, FieldInUseError } from '@/domain/errors'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>
  buildValidators (httpRequest: any): Validator[] { return [] }

  async handle (httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error !== undefined) return badRequest(error)
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      if (error instanceof FieldInUseError) return badRequest(error)
      if (error instanceof AuthenticationError) return unauthorized()
      return serverError(error)
    }
  }

  private validate (httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest)
    return new ValidationComposite(validators).validate()
  }
}
