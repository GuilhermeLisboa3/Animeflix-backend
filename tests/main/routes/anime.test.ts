import { app } from '@/main/config/app'
import env from '@/main/config/env'
import { sequelize, Account, Category, Anime } from '@/infra/database/postgres/entities'

import request from 'supertest'
import { sign } from 'jsonwebtoken'
import MockDate from 'mockdate'
import { RequiredFieldError } from '@/application/errors'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

describe('AnimeRoute', () => {
  let token: string
  const makeAccount = { firstName: 'any_name', lastName: 'any_last_name', email: 'any_email@gmail.com', password: 'any_password', birth: new Date(), phone: 'any_phone' }
  const makeCategory = { name: 'any_category', position: 1 }

  beforeAll(async () => {
    MockDate.set(new Date())
    token = sign({ key: '1' }, env.secret)
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await Account.create({ ...makeAccount, role: 'admin' })
    await Category.create(makeCategory)
  })

  afterAll(async () => {
    MockDate.reset()
    await sequelize.close()
  })

  describe('POST /anime', () => {
    it('should return 204 on success', async () => {
      const { status, body } = await request(app)
        .post('/anime')
        .set({ authorization: `Bearer: ${token}` })
        .field('name', 'any_anime')
        .field('categoryId', 1)
        .field('synopsis', 'any_synopsis')

      expect(status).toBe(204)
      expect(body).toBeTruthy()
    })

    it('should return 400 if any data is not supplied', async () => {
      const { status, body: { error } } = await request(app)
        .post('/anime')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_anime', categoryId: 1 })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('synopsis').message)
    })

    it('should return 400 if anime already exists', async () => {
      await Anime.create({ name: 'any_anime', categoryId: 1, synopsis: 'any_synopsis' })
      const { status, body: { error } } = await request(app)
        .post('/anime')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_anime', categoryId: 1, synopsis: 'any_synopsis' })

      expect(status).toBe(400)
      expect(error).toBe(new FieldInUseError('name').message)
    })

    it('should return 400 if category not exists', async () => {
      const { status, body: { error } } = await request(app)
        .post('/anime')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_anime', categoryId: 2, synopsis: 'any_synopsis' })

      expect(status).toBe(400)
      expect(error).toBe(new NotFoundError('categoryId').message)
    })
  })

  describe('DELETE /anime/:id', () => {
    it('should return 204 on success', async () => {
      await Anime.create({ name: 'any_anime', categoryId: 1, synopsis: 'any_synopsis' })
      const { status } = await request(app)
        .delete(`/anime/${1}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
    })
  })

  describe('PUT /anime/:id', () => {
    it('should return 204 on success', async () => {
      await Anime.create({ name: 'any_anime', categoryId: 1, synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnailUrl' })
      const { status } = await request(app)
        .put(`/anime/${1}`)
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_anime2', synopsis: 'any_synopsis2' })

      expect(status).toBe(204)
    })
  })

  describe('GET /animes/:id', () => {
    it('should return 200 on success', async () => {
      await Anime.create({ name: 'any_anime', categoryId: 1, synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnailUrl' })
      const { status, body } = await request(app)
        .get(`/animes/${1}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toEqual({
        name: 'any_anime',
        id: 1,
        synopsis: 'any_synopsis',
        thumbnailUrl: 'any_thumbnailUrl'
      })
    })
  })

  describe('GET /animes/search', () => {
    it('should return 200 on success', async () => {
      await Anime.create({ name: 'any_anime', categoryId: 1, synopsis: 'any_synopsis', featured: true })
      const { status, body } = await request(app)
        .get('/animes/search')
        .set({ authorization: `Bearer: ${token}` })
        .query({ name: 'any' })

      expect(status).toBe(200)
      expect(body).toEqual({
        animes: [{ id: 1, name: 'any_anime', synopsis: 'any_synopsis', thumbnailUrl: null }],
        page: 1,
        perPage: 10,
        count: 1
      })
    })
  })
})
