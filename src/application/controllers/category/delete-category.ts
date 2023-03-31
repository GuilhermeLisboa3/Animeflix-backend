import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { DeleteCategory } from '@/domain/usecases/category'

type HttpRequest = {
  id: string
}

export class DeleteCategoryController {
  constructor (private readonly deleteCategory: DeleteCategory) {}

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteCategory({ id })
    return noContent()
  }

  buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build()
    ]
  }
}
