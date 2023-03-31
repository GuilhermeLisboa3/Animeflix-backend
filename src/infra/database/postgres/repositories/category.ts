import { CheckCategory } from '@/domain/contracts/database/category'
import { Category } from '@/infra/database/postgres/entities'

export class CategoryRepository implements CheckCategory {
  async check ({ name, position }: CheckCategory.Input): Promise<CheckCategory.Output> {
    const existAccount = await Category.findOne({ where: { name, position } })
    return existAccount !== null
  }
}
