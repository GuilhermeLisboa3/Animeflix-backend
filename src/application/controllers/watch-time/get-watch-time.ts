import { Validator, ValidationBuilder as build } from '@/application/validation'

type HttpRequest = { accountId: string, id: string }

export class GetWatchTimeController {
  buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...build.of(id, 'id').required().build()
    ]
  }
}
