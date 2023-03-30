import { UnauthorizedError } from '@/application/errors'
import { sequelize } from '@/infra/database/postgres/entities'
import { app } from '@/main/config/app'
import { authAdmin } from '@/main/middlewares'

import request from 'supertest'

describe('AuthMiddleware', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  afterAll(async () => {
    await sequelize.close()
  })

  it('should return 401 if authorization header was not provided', async () => {
    app.get('/fake_route', authAdmin)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(401)
    expect(body.error).toEqual(new UnauthorizedError().message)
  })
})
