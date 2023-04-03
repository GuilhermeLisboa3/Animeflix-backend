import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { SearchAnimesByName } from '@/domain/usecases/anime'

type HttpRequest = { name: string, page?: string, perPage?: string }

export class SearchAnimesByNameController extends Controller {
  constructor (private readonly searchAnimesByName: SearchAnimesByName) { super() }

  async perform ({ name, page, perPage }: HttpRequest): Promise<HttpResponse> {
    const animes = await this.searchAnimesByName({ name, page, perPage })
    return ok(animes)
  }

  override buildValidators ({ name }: HttpRequest): Validator[] {
    return [
      ...builder.of(name, 'name').required().build()
    ]
  }
}
