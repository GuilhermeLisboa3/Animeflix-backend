import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { AddAnime } from '@/domain/usecases/anime'

type HttpRequest = {
  name: string
  categoryId: number
  file?: { buffer: Buffer, mimeType: string }
  synopsis: string
  featured?: boolean
}

export class AddAnimeController extends Controller {
  constructor (private readonly addAnime: AddAnime) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    await this.addAnime(input)
    return noContent()
  }

  buildValidators ({ name, categoryId, synopsis, featured, file }: HttpRequest): Validator[] {
    return [
      ...builder.of(name, 'name').required().build(),
      ...builder.of(categoryId, 'categoryId').required().build(),
      ...builder.of(synopsis, 'synopsis').required().build(),
      ...builder.of(file, 'file').image({ AllowedMimeTypes: ['jpg', 'png'], maxSizeInMb: 6 }).build()
    ]
  }
}
