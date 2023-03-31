import { HttpResponse, ok } from '@/application/helpers'
import { ListCategory } from '@/domain/usecases/category'
import { Controller } from '@/application/controllers'

type HttpRequest = {
  page?: string
  perPage?: string
}

export class ListCategoryController extends Controller {
  constructor (private readonly listCategory: ListCategory) { super() }

  async perform ({ page, perPage }: HttpRequest): Promise<HttpResponse> {
    const listCategories = await this.listCategory({ page, perPage })
    return ok(listCategories)
  }
}
