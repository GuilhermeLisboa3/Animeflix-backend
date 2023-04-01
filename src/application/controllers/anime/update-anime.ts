import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { UpdateAnime } from '@/domain/usecases/anime'

type HttpRequest = {
  id: string
  name?: string
  categoryId?: number
  file?: { buffer: Buffer, mimeType: string }
  synopsis?: string
  featured?: boolean
}

export class UpdateAnimeController {
  constructor (private readonly updateAnime: UpdateAnime) {}

  async perform (input: HttpRequest): Promise<HttpResponse> {
    await this.updateAnime(input)
    return noContent()
  }

  buildValidators ({ id, file }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build(),
      ...builder.of(file, 'file').image({ AllowedMimeTypes: ['jpg', 'png'], maxSizeInMb: 6 }).build()
    ]
  }
}
