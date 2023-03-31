import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { AddCategory } from '@/domain/usecases/category'

type HttpRequest = {
  name: string
  position: number
}

export class AddCategoryController {
  constructor (private readonly addCategory: AddCategory) {}

  async perform ({ name, position }: HttpRequest): Promise<void> {
    await this.addCategory({ name, position })
  }

  buildValidators ({ name, position }: HttpRequest): Validator[] {
    return [
      ...builder.of(name, 'name').required().build(),
      ...builder.of(position, 'position').required().build()
    ]
  }
}
