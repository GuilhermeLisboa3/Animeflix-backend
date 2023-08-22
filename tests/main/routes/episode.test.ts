import { app } from '@/main/config/app'
import env from '@/main/config/env'
import { sequelize, Account, Category, Anime, Episode } from '@/infra/database/postgres/entities'
import { RequiredFieldError } from '@/application/errors'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

import request from 'supertest'
import { sign } from 'jsonwebtoken'

describe('EpisodeRoute', () => {
  let token: string
  const makeAccount = { firstName: 'any_name', lastName: 'any_last_name', email: 'any_email@gmail.com', password: 'any_password', birth: new Date(), phone: 'any_phone' }
  const makeCategory = { name: 'any_category', position: 1 }
  const makeAnime = { name: 'any_anime', categoryId: 1, synopsis: 'any_synopsis', featured: true }

  beforeAll(async () => {
    token = sign({ key: '1' }, env.secret)
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await Account.create({ ...makeAccount, role: 'admin' })
    await Category.create(makeCategory)
    await Anime.create(makeAnime)
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('POST /episode', () => {
    it('should return 204 on success', async () => {
      const { status, body } = await request(app)
        .post('/episode')
        .set({ authorization: `Bearer: ${token}` })
        .field('name', 'any_anime')
        .field('animeId', 1)
        .field('synopsis', 'any_synopsis')
        .field('order', 1)

      expect(status).toBe(204)
      expect(body).toBeTruthy()
    })

    it('should return 400 if any data is not supplied', async () => {
      const { status, body: { error } } = await request(app)
        .post('/episode')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_anime', animeId: 1, synopsis: 'any_synopsis' })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('order').message)
    })

    it('should return 400 if episode already exists', async () => {
      await Episode.create({ name: 'any_anime', animeId: 1, synopsis: 'any_synopsis', order: 1 })
      const { status, body: { error } } = await request(app)
        .post('/episode')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_anime', animeId: 1, synopsis: 'any_synopsis', order: 1 })

      expect(status).toBe(400)
      expect(error).toBe(new FieldInUseError('order').message)
    })

    it('should return 400 if animeId not exists', async () => {
      const { status, body: { error } } = await request(app)
        .post('/episode')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_anime', animeId: 2, synopsis: 'any_synopsis', order: 1 })

      expect(status).toBe(400)
      expect(error).toBe(new NotFoundError('animeId').message)
    })
  })

  describe('PUT /episode/:id', () => {
    it('should return 204 on success', async () => {
      await Episode.create({ name: 'any_anime', animeId: 1, synopsis: 'any_synopsis', order: 1, videoUrl: 'any_video' })
      const { status } = await request(app)
        .put(`/episode/${1}`)
        .set({ authorization: `Bearer: ${token}` })
        .send({ id: '1', name: 'any_name2' })

      expect(status).toBe(204)
    })
  })

  describe('DELETE /episode/:id', () => {
    it('should return 204 on success', async () => {
      await Episode.create({ name: 'any_anime', animeId: 1, synopsis: 'any_synopsis', order: 1 })
      const { status } = await request(app)
        .delete(`/episode/${1}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
    })
  })

  describe('GET /episode/stream', () => {
    it('should return 200 on success', async () => {
      await Episode.create({ name: 'any_anime', animeId: 1, synopsis: 'any_synopsis', order: 1, videoUrl: 'any_video' })
      const { status, body } = await request(app)
        .get('/episode/stream')
        .query({ token })
        .query({ animeId: 1 })
        .query({ order: 1 })

      expect(status).toBe(200)
      expect(body).toBe('any_video')
    })
  })
})
