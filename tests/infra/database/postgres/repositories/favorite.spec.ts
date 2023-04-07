import { FavoriteRepository } from '@/infra/database/postgres/repositories'
import { Anime, Category, sequelize, Account, Favorite } from '@/infra/database/postgres/entities'

describe('FavoriteRepository', () => {
  let sut: FavoriteRepository
  let makeFavorite: { userId: number, animeId: number }

  beforeAll(async () => {
    makeFavorite = { userId: 1, animeId: 1 }
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await Account.create({ firstName: 'any_name', lastName: 'any_last_name', email: 'any_email', password: 'any_password', birth: new Date(), phone: 'any_phone', role: 'user' })
    await Category.create({ name: 'any_name', position: 1 })
    await Anime.create({ name: 'any_name', categoryId: 1, synopsis: 'any_synopsis' })
    sut = new FavoriteRepository()
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

  describe('delete', () => {
    it('should return undefined on success', async () => {
      await Favorite.create(makeFavorite)

      const deleteFavorite = await sut.delete(makeFavorite)

      expect(deleteFavorite).toBeUndefined()

      const favorite = await Favorite.findOne({ where: { animeId: 1, userId: 1 } })

      expect(favorite).toBeNull()
    })
  })

  describe('list', () => {
    it('should return list animeId on success', async () => {
      await Favorite.create(makeFavorite)

      const listAnimeId = await sut.list({ userId: 1 })

      expect(listAnimeId).toEqual([1])
    })

    it('should return undefined if not favorite', async () => {
      const listAnimeId = await sut.list({ userId: 1 })

      expect(listAnimeId).toBeUndefined()
    })
  })

  describe('check', () => {
    it('should return true if favorite exists', async () => {
      await Favorite.create(makeFavorite)

      const checkFavorite = await sut.check({ userId: '1', animeId: '1' })

      expect(checkFavorite).toBeTruthy()
    })
  })
})
