import { ForbiddenError, UnauthorizedError } from '@/application/errors'
import { Account, sequelize } from '@/infra/database/postgres/entities'
import { app } from '@/main/config/app'
import { authAdmin } from '@/main/middlewares'
import env from '@/main/config/env'

import { sign } from 'jsonwebtoken'
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

  it('should return 403 if authorize fails', async () => {
    await Account.create({
      firstName: 'any_name',
      lastName: 'any_last_name',
      email: 'any_email@gmail.com',
      password: 'any_password',
      birth: new Date(),
      phone: 'any_phone',
      role: 'user'
    })
    const token = sign({ key: '1' }, env.secret)

    app.get('/fake_route', authAdmin)

    const { status, body } = await request(app).get('/fake_route').set({ authorization: `Bearer: ${token}` })

    expect(status).toBe(403)
    expect(body.error).toEqual(new ForbiddenError().message)
  })
})
