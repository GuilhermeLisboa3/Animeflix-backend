import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { SearchAnimesByName } from '@/domain/usecases/anime'

type HttpRequest = { name: string, page?: string, perPage?: string }

export class SearchAnimesByNameController {
  constructor (private readonly searchAnimesByName: SearchAnimesByName) {}

  async perform ({ name, page, perPage }: HttpRequest): Promise<void> {
    await this.searchAnimesByName({ name, page, perPage })
  }

  buildValidators ({ name }: HttpRequest): Validator[] {
    return [
      ...builder.of(name, 'name').required().build()
    ]
  }
}
