import { app } from '@/main/config/app'
import env from '@/main/config/env'
import { sequelize, Account, Category, Anime, Episode, WatchTime } from '@/infra/database/postgres/entities'

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

  describe('POST /episodes/:id/WatchTime', () => {
    it('should return 204 on success', async () => {
      const { status } = await request(app)
        .post(`/episodes/${1}/WatchTime`)
        .set({ authorization: `Bearer: ${token}` })
        .send({ seconds: 1 })

      expect(status).toBe(204)
    })
  })

  describe('GET /episodes/:id/WatchTime', () => {
    it('should return 200 on success', async () => {
      await WatchTime.create({ userId: 1, episodeId: 1, seconds: 10 })
      const { status, body } = await request(app)
        .get(`/episodes/${1}/WatchTime`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toEqual({ seconds: 10 })
    })
  })
})
