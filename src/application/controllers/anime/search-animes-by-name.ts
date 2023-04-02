import { Validator, ValidationBuilder as builder } from '@/application/validation'

type HttpRequest = { name: string, page?: string, perPage?: string }

export class SearchAnimesByNameController {
  buildValidators ({ name }: HttpRequest): Validator[] {
    return [
      ...builder.of(name, 'name').required().build()
    ]
  }
}
