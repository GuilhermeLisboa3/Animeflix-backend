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

  describe('loadById', () => {
    it('should return episode on success', async () => {
      await Episode.create(makeEpisode)

      const episode = await sut.loadById({ id: '1' })

      expect(episode).toMatchObject({ videoUrl: 'any_value' })
    })

    it('should return undefined if episode not exists', async () => {
      const episode = await sut.loadById({ id: '1' })

      expect(episode).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should return undefined if update episode on success', async () => {
      await Episode.create(makeEpisode)

      const updateEpisode = await sut.update({ id: '1', name: 'any_name2' })

      expect(updateEpisode).toBeUndefined()

      const episode = await Episode.findOne({ where: { id: '1' } })

      expect(episode).toMatchObject({ name: 'any_name2' })
    })
  })

  describe('delete', () => {
    it('should return undefined if delete episode on success', async () => {
      await Episode.create(makeEpisode)

      const deleteEpisode = await sut.deleteById({ id: '1' })

      expect(deleteEpisode).toBeUndefined()

      const episode = await Episode.findOne({ where: { id: '1' } })

      expect(episode).toBeNull()
    })
  })
})
