import { LoadCategory } from '@/domain/usecases/category'

type HttpRequest = { id: string }

export class GetCategoryController {
  constructor (private readonly loadCategory: LoadCategory) {}

  async perform ({ id }: HttpRequest): Promise<void> {
    await this.loadCategory({ id })
  }
}
