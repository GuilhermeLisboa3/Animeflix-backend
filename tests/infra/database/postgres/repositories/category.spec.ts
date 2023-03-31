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
  })
})
