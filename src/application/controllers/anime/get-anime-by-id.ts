import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { GetAnimeById } from '@/domain/usecases/anime'

type HttpRequest = { id: string }

export class GetAnimeByIdController extends Controller {
  constructor (private readonly getAnimeById: GetAnimeById) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    const anime = await this.getAnimeById({ id })
    return ok(anime)
  }

  override buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build()
    ]
  }
}
