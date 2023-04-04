import { Validator, ValidationBuilder as build } from '@/application/validation'

type HttpRequest = { accountId: string }

export class ListFavoriteController {
  buildValidators ({ accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build()
    ]
  }
}
