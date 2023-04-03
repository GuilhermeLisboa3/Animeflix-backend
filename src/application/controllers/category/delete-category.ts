import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { DeleteCategory } from '@/domain/usecases/category'

type HttpRequest = {
  id: string
}

export class DeleteCategoryController extends Controller {
  constructor (private readonly deleteCategory: DeleteCategory) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteCategory({ id })
    return noContent()
  }

  override buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build()
    ]
  }
}
