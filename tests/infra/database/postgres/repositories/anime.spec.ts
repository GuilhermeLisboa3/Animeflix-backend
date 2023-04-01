import { AnimeRepository } from '@/infra/database/postgres/repositories'
import { Anime, Category, sequelize } from '@/infra/database/postgres/entities'

import MockDate from 'mockdate'

describe('AnimeRepository', () => {
  let sut: AnimeRepository
  let makeAnime: { name: string, synopsis: string, thumbnailUrl?: string, featured?: boolean, categoryId: number }

  beforeAll(async () => {
    MockDate.set(new Date())
    makeAnime = { name: 'any_name', categoryId: 1, synopsis: 'any_synopsis' }
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await Category.create({ name: 'any_name', position: 1 })
    sut = new AnimeRepository()
  })

  afterAll(async () => {
    MockDate.reset()
    await sequelize.close()
  })

  describe('check', () => {
    it('should return true if anime exists', async () => {
      await Anime.create(makeAnime)

      const existAnime = await sut.check({ name: 'any_name' })

      expect(existAnime).toBeTruthy()
    })

    it('should return false if anime not exists', async () => {
      const existAnime = await sut.check({ name: 'any_name' })

      expect(existAnime).toBeFalsy()
    })
  })
})
