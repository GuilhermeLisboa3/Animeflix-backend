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

  describe('create', () => {
    it('should return true if the anime is successfully created', async () => {
      const anime = await sut.create(makeAnime)

      expect(anime).toBeTruthy()
    })
  })

  describe('loadById', () => {
    it('should return anime on success', async () => {
      await Anime.create(makeAnime)

      const anime = await sut.loadById({ id: '1' })

      expect(anime).toMatchObject({ id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: null })
    })

    it('should return undefined if anime not exists', async () => {
      const anime = await sut.loadById({ id: '1' })

      expect(anime).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('should return undefined on success', async () => {
      await Anime.create(makeAnime)

      const deleteAnime = await sut.deleteById({ id: '1' })

      expect(deleteAnime).toBeUndefined()

      const anime = await Anime.findOne({ where: { id: '1' } })

      expect(anime).toBeNull()
    })
  })

  describe('update', () => {
    it('should return undefined on success', async () => {
      await Anime.create(makeAnime)
      await Category.create({ name: 'any_name2', position: 2 })

      const updateAnime = await sut.update({ id: '1', name: 'any_name2', categoryId: 2, synopsis: 'any_synopsis2' })

      expect(updateAnime).toBeUndefined()

      const anime = await Anime.findOne({ where: { id: '1' } })

      expect(anime).toMatchObject({ id: 1, name: 'any_name2', categoryId: 2, synopsis: 'any_synopsis2' })
    })
  })

  describe('listByName', () => {
    it('should return list anime on success', async () => {
      await Anime.create(makeAnime)

      const listAnimes = await sut.listByName({ page: 1, perPage: 10, name: 'any' })

      expect(listAnimes).toMatchObject({
        animes: [{ name: 'any_name', id: 1, synopsis: 'any_synopsis', thumbnailUrl: null }],
        page: 1,
        perPage: 10,
        count: 1
      })
    })
  })

  describe('listByFeatured', () => {
    it('should return a list of featured animes', async () => {
      await Anime.create({ ...makeAnime, featured: true, thumbnailUrl: 'any_thumbnail' })
      await Anime.create({ name: 'any_name2', categoryId: 1, synopsis: 'any_synopsis', featured: false })

      const listAnimeFeatured = await sut.listByFeatured()
      const listAnime = listAnimeFeatured.sort(() => 0.5 - Math.random())

      expect(listAnime).toMatchObject([
        { id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnail' }
      ])
    })
  })

  describe('listNewest', () => {
    it('should return list of newest animes', async () => {
      await Anime.create(makeAnime)
      await Anime.create({ name: 'any_name2', categoryId: 1, synopsis: 'any_synopsis', featured: true, thumbnailUrl: 'any_thumbnail' })

      const listAnimeNewest = await sut.listNewest()

      expect(listAnimeNewest).toMatchObject([
        { id: 1, name: 'any_name', categoryId: 1, synopsis: 'any_synopsis', featured: false, thumbnailUrl: null, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'any_name2', categoryId: 1, synopsis: 'any_synopsis', featured: true, thumbnailUrl: 'any_thumbnail', createdAt: new Date(), updatedAt: new Date() }
      ])
    })
  })
})
