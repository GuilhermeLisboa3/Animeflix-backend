import { app } from '@/main/config/app'
import env from '@/main/config/env'
import { sequelize, Account, Category, Anime } from '@/infra/database/postgres/entities'

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
  })
})
