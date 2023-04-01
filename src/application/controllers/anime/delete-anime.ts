import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { DeleteAnime } from '@/domain/usecases/anime'

type HttpRequest = { id: string }

export class DeleteAnimeController extends Controller {
  constructor (private readonly deleteAnime: DeleteAnime) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteAnime({ id })
    return noContent()
  }

  buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build()
    ]
  }
}
