import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { GetCategory } from '@/domain/usecases/category'

type HttpRequest = { id: string }

export class GetCategoryController extends Controller {
  constructor (private readonly getCategory: GetCategory) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    const category = await this.getCategory({ id })
    return ok(category)
  }
}
