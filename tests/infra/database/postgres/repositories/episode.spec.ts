import { EpisodeRepository } from '@/infra/database/postgres/repositories'
import { Anime, Category, sequelize, Episode } from '@/infra/database/postgres/entities'

describe('EpisodeRepository', () => {
  let sut: EpisodeRepository
  let makeEpisode: { name: string, synopsis: string, videoUrl?: string, secondsLong?: number, animeId: number, order: number }

  beforeAll(async () => {
    makeEpisode = { name: 'any_name', animeId: 1, synopsis: 'any_synopsis', order: 1, videoUrl: 'any_value' }
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await Category.create({ name: 'any_name', position: 1 })
    await Anime.create({ name: 'any_name', categoryId: 1, synopsis: 'any_synopsis' })
    sut = new EpisodeRepository()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('checkByOrder', () => {
    it('should return true if episode exists', async () => {
      await Episode.create(makeEpisode)

      const existEpisode = await sut.checkByOrder({ order: 1 })

      expect(existEpisode).toBeTruthy()
    })

    it('should return false if episode not exists', async () => {
      const existEpisode = await sut.checkByOrder({ order: 1 })

      expect(existEpisode).toBeFalsy()
    })
  })

  describe('create', () => {
    it('should return true if the episode is successfully created', async () => {
      const Episode = await sut.create(makeEpisode)

      expect(Episode).toBeTruthy()
    })
  })
})
