import { Validator, ValidationBuilder as build } from '@/application/validation'

type HttpRequest = { accountId: string, id: string, seconds: number }

export class AddWatchTimeController {
  buildValidators ({ id, seconds }: HttpRequest): Validator[] {
    return [
      ...build.of(id, 'id').required().build(),
      ...build.of(seconds, 'seconds').required().build()
    ]
  }
}
