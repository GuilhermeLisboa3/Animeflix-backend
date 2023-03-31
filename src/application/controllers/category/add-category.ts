import { Validator, ValidationBuilder as builder } from '@/application/validation'

type HttpRequest = {
  name: string
  position: number
}

export class AddCategoryController {
  buildValidators ({ name, position }: HttpRequest): Validator[] {
    return [
      ...builder.of(name, 'name').required().build(),
      ...builder.of(position, 'position').required().build()
    ]
  }
}
