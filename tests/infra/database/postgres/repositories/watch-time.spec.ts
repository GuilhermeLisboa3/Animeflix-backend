import { WatchTimeRepository } from '@/infra/database/postgres/repositories'
import { Anime, Category, sequelize, Account, Episode, WatchTime } from '@/infra/database/postgres/entities'

describe('WatchTimeRepository', () => {
  let sut: WatchTimeRepository
  let makeWatchTime: { userId: number, episodeId: number, seconds: number }

  beforeAll(async () => {
    makeWatchTime = { userId: 1, episodeId: 1, seconds: 100 }
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await Account.create({ firstName: 'any_name', lastName: 'any_last_name', email: 'any_email', password: 'any_password', birth: new Date(), phone: 'any_phone', role: 'user' })
    await Category.create({ name: 'any_name', position: 1 })
    await Anime.create({ name: 'any_name', categoryId: 1, synopsis: 'any_synopsis' })
    await Episode.create({ name: 'any_name', animeId: 1, synopsis: 'any_synopsis', order: 1, videoUrl: 'any_value' })
    sut = new WatchTimeRepository()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('save', () => {
    it('should return undefined on success', async () => {
      const seconds = await sut.save(makeWatchTime)

      expect(seconds).toBeUndefined()
    })

    it('should should update seconds if it already exists', async () => {
      await WatchTime.create(makeWatchTime)

      await sut.save({ userId: 1, episodeId: 1, seconds: 10 })

      const updateSeconds = await WatchTime.findOne({ where: { userId: 1, episodeId: 1 } })

      expect(updateSeconds?.seconds).toBe(10)
    })
  })

  describe('load', () => {
    it('should return watch time on success', async () => {
      await WatchTime.create(makeWatchTime)

      const seconds = await sut.load({ userId: '1', episodeId: '1' })

      expect(seconds).toMatchObject({ seconds: 100, userId: 1, episodeId: 1 })
    })

    it('should return error if watch time not exists', async () => {
      const promise = sut.load({ userId: '2', episodeId: '2' })

      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByUserId', () => {
    it('should return list episodeId on success', async () => {
      await WatchTime.create(makeWatchTime)

      const listAnimeId = await sut.loadByUserId({ userId: '1' })

      expect(listAnimeId).toEqual([1])
    })
  })
})
