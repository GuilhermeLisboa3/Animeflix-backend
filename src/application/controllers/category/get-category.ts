import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { NotFoundError } from '@/domain/errors'
import { LoadCategory } from '@/domain/usecases/category'

type HttpRequest = { id: string }

export class GetCategoryController extends Controller {
  constructor (private readonly loadCategory: LoadCategory) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    const category = await this.loadCategory({ id })
    if (!category) throw new NotFoundError('category')
    return ok(category)
  }
}
