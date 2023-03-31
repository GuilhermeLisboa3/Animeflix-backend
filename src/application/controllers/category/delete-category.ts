import { Validator, ValidationBuilder as builder } from '@/application/validation'

type HttpRequest = {
  id: string
}

export class DeleteCategoryController {
  buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build()
    ]
  }
}
