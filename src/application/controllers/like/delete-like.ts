import { Validator, ValidationBuilder as build } from '@/application/validation'

type HttpRequest = { accountId: string, animeId: string }

export class DeleteLikeController {
  buildValidators ({ animeId, accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build(),
      ...build.of(animeId, 'animeId').required().build()
    ]
  }
}
