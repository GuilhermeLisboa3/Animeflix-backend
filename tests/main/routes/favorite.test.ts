import { app } from '@/main/config/app'
import env from '@/main/config/env'
import { sequelize, Account, Category, Anime, Episode, Favorite } from '@/infra/database/postgres/entities'

import request from 'supertest'
import { sign } from 'jsonwebtoken'

describe('AccountRoute', () => {
  let token: string

  beforeAll(async () => {
    token = sign({ key: '1' }, env.secret)
  })
  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await Account.create({ firstName: 'any_name', lastName: 'any_last_name', email: 'any_email', password: 'any_password', birth: new Date(), phone: 'any_phone', role: 'user' })
    await Category.create({ name: 'any_name', position: 1 })
    await Anime.create({ name: 'any_name', categoryId: 1, synopsis: 'any_synopsis' })
    await Episode.create({ name: 'any_name', animeId: 1, synopsis: 'any_synopsis', order: 1, videoUrl: 'any_value' })
  })
  afterAll(async () => {
    await sequelize.close()
  })

  describe('POST /favorites', () => {
    it('should return 204 on success', async () => {
      const { status } = await request(app)
        .post('/favorites')
        .set({ authorization: `Bearer: ${token}` })
        .send({ animeId: 1 })

      expect(status).toBe(204)
    })
  })

  describe('DELETE /favorites/:id', () => {
    it('should return 204 on success', async () => {
      await Favorite.create({ userId: 1, animeId: 1 })

      const { status } = await request(app)
        .delete(`/favorites/${1}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
    })
  })

  describe('GET /favorites', () => {
    it('should return 200 on success', async () => {
      await Favorite.create({ userId: 1, animeId: 1 })

      const { status, body } = await request(app)
        .get('/favorites')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toEqual({
        accountId: 1,
        animes: [{ id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: null }]
      })
    })
  })
})
