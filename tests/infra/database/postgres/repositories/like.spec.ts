import { LikeRepository } from '@/infra/database/postgres/repositories'
import { Anime, Category, sequelize, Account } from '@/infra/database/postgres/entities'

describe('LikeRepository', () => {
  let sut: LikeRepository
  let makeFavorite: { userId: number, animeId: number }

  beforeAll(async () => {
    makeFavorite = { userId: 1, animeId: 1 }
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await Account.create({ firstName: 'any_name', lastName: 'any_last_name', email: 'any_email', password: 'any_password', birth: new Date(), phone: 'any_phone', role: 'user' })
    await Category.create({ name: 'any_name', position: 1 })
    await Anime.create({ name: 'any_name', categoryId: 1, synopsis: 'any_synopsis' })
    sut = new LikeRepository()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('create', () => {
    it('should return undefined on success', async () => {
      const seconds = await sut.create(makeFavorite)

      expect(seconds).toBeUndefined()
    })
  })
})
