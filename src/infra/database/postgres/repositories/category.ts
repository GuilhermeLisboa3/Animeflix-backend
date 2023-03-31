import { CheckCategory, CreateCategory, ListAllCategories, LoadCategoryById } from '@/domain/contracts/database/category'
import { Category } from '@/infra/database/postgres/entities'

export class CategoryRepository implements CheckCategory, CreateCategory, ListAllCategories {
  async check ({ name, position }: CheckCategory.Input): Promise<CheckCategory.Output> {
    const existAccount = await Category.findOne({ where: { name, position } })
    return existAccount !== null
  }

  async create ({ name, position }: CreateCategory.Input): Promise<CreateCategory.Output> {
    const createCategory = await Category.create({ name, position })
    return createCategory !== null
  }

  async list ({ page, perPage }: ListAllCategories.Input): Promise<ListAllCategories.Output> {
    const offset = (page - 1) * perPage
    const { count, rows } = await Category.findAndCountAll({
      attributes: ['id', 'name', 'position'],
      order: [['position', 'ASC']],
      limit: perPage,
      offset
    })

    return { categories: rows, page: page, perPage: perPage, count: count }
  }

  async loadById ({ id }: LoadCategoryById.Input): Promise<LoadCategoryById.Output> {
    const category = await Category.findByPk(id)
    if (!category) return undefined
    return { id: category.id.toString(), name: category.name, position: category.position }
  }
}
