import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { DeleteCategory } from '@/domain/usecases/category'

type HttpRequest = {
  id: string
}

export class DeleteCategoryController {
  constructor (private readonly deleteCategory: DeleteCategory) {}

  async perform ({ id }: HttpRequest): Promise<void> {
    await this.deleteCategory({ id })
  }

  buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build()
    ]
  }
}
