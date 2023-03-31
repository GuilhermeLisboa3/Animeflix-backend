import { CheckCategory, CreateCategory } from '@/domain/contracts/database/category'
import { Category } from '@/infra/database/postgres/entities'

export class CategoryRepository implements CheckCategory, CreateCategory {
  async check ({ name, position }: CheckCategory.Input): Promise<CheckCategory.Output> {
    const existAccount = await Category.findOne({ where: { name, position } })
    return existAccount !== null
  }

  async create ({ name, position }: CreateCategory.Input): Promise<CreateCategory.Output> {
    const createCategory = await Category.create({ name, position })
    return createCategory !== null
  }
}
