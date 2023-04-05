import { LikeRepository } from '@/infra/database/postgres/repositories'
import { Anime, Category, sequelize, Account, Like } from '@/infra/database/postgres/entities'

describe('LikeRepository', () => {
  let sut: LikeRepository
  let makeLike: { userId: number, animeId: number }

  beforeAll(async () => {
    makeLike = { userId: 1, animeId: 1 }
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
      const seconds = await sut.create(makeLike)

      expect(seconds).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('should return undefined on success', async () => {
      await Like.create(makeLike)

      const deleteLike = await sut.delete(makeLike)

      expect(deleteLike).toBeUndefined()

      const like = await Like.findOne({ where: { animeId: 1, userId: 1 } })

      expect(like).toBeNull()
    })
  })

  describe('check', () => {
    it('should return true if like exists', async () => {
      await Like.create(makeLike)

      const existsLike = await sut.check(makeLike)

      expect(existsLike).toBeTruthy()
    })

    it('should return true if like not exists', async () => {
      const existsLike = await sut.check(makeLike)

      expect(existsLike).toBeFalsy()
    })
  })
})
