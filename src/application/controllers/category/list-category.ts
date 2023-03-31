import { HttpResponse, ok } from '@/application/helpers'
import { ListCategory } from '@/domain/usecases/category'

type HttpRequest = {
  page?: string
  perPage?: string
}

export class ListCategoryController {
  constructor (private readonly listCategory: ListCategory) {}

  async perform ({ page, perPage }: HttpRequest): Promise<HttpResponse> {
    const listCategories = await this.listCategory({ page, perPage })
    return ok(listCategories)
  }
}
