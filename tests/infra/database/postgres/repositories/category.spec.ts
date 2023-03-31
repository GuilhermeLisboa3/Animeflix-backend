import { CategoryRepository } from '@/infra/database/postgres/repositories'
import { Category, sequelize } from '@/infra/database/postgres/entities'

describe('CategoryRepository', () => {
  let sut: CategoryRepository

  beforeAll(async () => {

  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    sut = new CategoryRepository()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('check', () => {
    it('should return true if category exists', async () => {
      await Category.create({ name: 'any_category', position: 1 })

      const existCategory = await sut.check({ name: 'any_category', position: 1 })

      expect(existCategory).toBeTruthy()
    })

    it('should return false if category not exists', async () => {
      const existAccount = await sut.check({ name: 'any_category', position: 1 })

      expect(existAccount).toBeFalsy()
    })
  })

  describe('create', () => {
    it('should create category on success', async () => {
      const category = await sut.create({ name: 'any_category', position: 1 })

      expect(category).toBeTruthy()
    })
  })

  describe('list', () => {
    it('should return list categories on success', async () => {
      await Category.create({ name: 'any_category', position: 1 })

      const listCategories = await sut.list({ page: 1, perPage: 10 })

      expect(listCategories).toMatchObject({
        categories: [{ id: 1, name: 'any_category', position: 1 }],
        page: 1,
        perPage: 10,
        count: 1
      })
    })
  })

  describe('loadById', () => {
    it('should return category on success', async () => {
      await Category.create({ name: 'any_category', position: 1 })

      const category = await sut.loadById({ id: '1' })

      expect(category).toMatchObject({ id: '1', name: 'any_category', position: 1 })
    })
  })
})
