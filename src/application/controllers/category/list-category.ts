import { ListCategory } from '@/domain/usecases/category'

type HttpRequest = {
  page?: string
  perPage?: string
}

export class ListCategoryController {
  constructor (private readonly listCategory: ListCategory) {}

  async perform ({ page, perPage }: HttpRequest): Promise<void> {
    await this.listCategory({ page, perPage })
  }
}
