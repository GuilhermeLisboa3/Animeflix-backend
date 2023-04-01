import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { AddAnime } from '@/domain/usecases/anime'

type HttpRequest = {
  name: string
  categoryId: number
  file?: { buffer: Buffer, mimeType: string }
  synopsis: string
  featured?: boolean
}

export class AddAnimeController {
  constructor (private readonly addAnime: AddAnime) {}

  async perform (input: HttpRequest): Promise<void> {
    await this.addAnime(input)
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
