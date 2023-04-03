import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { AddCategory } from '@/domain/usecases/category'

type HttpRequest = {
  name: string
  position: number
}

export class AddCategoryController extends Controller {
  constructor (private readonly addCategory: AddCategory) { super() }

  async perform ({ name, position }: HttpRequest): Promise<HttpResponse> {
    await this.addCategory({ name, position })
    return noContent()
  }

  override buildValidators ({ name, position }: HttpRequest): Validator[] {
    return [
      ...builder.of(name, 'name').required().build(),
      ...builder.of(position, 'position').required().build()
    ]
  }
}
