import { app } from '@/main/config/app'
import { sequelize, Account } from '@/infra/database/postgres/entities'
import { FieldInUseError } from '@/domain/errors'

import request from 'supertest'
import { RequiredFieldError } from '@/application/errors'
import { UnauthorizedError } from '@/application/errors/http'

describe('AccountRoute', () => {
  let makeAccount: { firstName: string, lastName: string, email: string, password: string, birth: Date, phone: string, role: 'user' | 'admin' }

  beforeAll(async () => {
    makeAccount = {
      firstName: 'any_name',
      lastName: 'any_last_name',
      email: 'any_email@gmail.com',
      password: 'any_password',
      birth: new Date(),
      phone: 'any_phone',
      role: 'user'
    }
  })
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  afterAll(async () => {
    await sequelize.close()
  })

  describe('POST /auth/register', () => {
    it('should return 200 on success', async () => {
      const { status, body } = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'any_name',
          lastName: 'any_last_name',
          email: 'any_email@gmail.com',
          password: 'any_password',
          birth: new Date(),
          phone: 'any_phone'
        })

      expect(status).toBe(200)
      expect(body).toBeTruthy()
    })

    it('should return 400 if any data is not supplied', async () => {
      const { status, body: { error } } = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'any_name',
          lastName: 'any_last_name',
          email: 'any_email@gmail.com',
          password: 'any_password',
          phone: 'any_phone'
        })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('birth').message)
    })

    it('should return 400 if email already exists', async () => {
      await Account.create(makeAccount)
      const { status, body: { error } } = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'any_name',
          lastName: 'any_last_name',
          email: 'any_email@gmail.com',
          password: 'any_password',
          birth: new Date(),
          phone: 'any_phone'
        })

      expect(status).toBe(400)
      expect(error).toBe(new FieldInUseError('email').message)
    })
  })

  describe('POST /auth/login', () => {
    it('should return 200 on success', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          firstName: 'any_name',
          lastName: 'any_last_name',
          email: 'any_email@gmail.com',
          password: 'any_password',
          birth: new Date(),
          phone: 'any_phone'
        })
      const { status, body } = await request(app)
        .post('/auth/login')
        .send({ email: 'any_email@gmail.com', password: 'any_password' })

      expect(status).toBe(200)
      expect(body).toBeTruthy()
    })

    it('should return 400 if any data is not supplied', async () => {
      const { status, body: { error } } = await request(app)
        .post('/auth/login')
        .send({
          email: 'any_email@gmail.com'
        })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('password').message)
    })

    it('should return 401 if account does not exists', async () => {
      const { status, body: { error } } = await request(app)
        .post('/auth/login')
        .send({
          email: 'any_email@gmail.com',
          password: 'any_password'
        })

      expect(status).toBe(401)
      expect(error).toBe(new UnauthorizedError().message)
    })
  })
})
