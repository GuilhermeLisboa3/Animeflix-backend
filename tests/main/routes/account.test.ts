import { app } from '@/main/config/app'
import env from '@/main/config/env'
import { sequelize, Account } from '@/infra/database/postgres/entities'
import { FieldInUseError } from '@/domain/errors'
import { RequiredFieldError } from '@/application/errors'
import { UnauthorizedError } from '@/application/errors/http'

import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { hash } from 'bcrypt'

describe('AccountRoute', () => {
  let makeAccount: { firstName: string, lastName: string, email: string, password: string, birth: Date, phone: string, role: 'user' | 'admin' }
  let token: string

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
    token = sign({ key: '1' }, env.secret)
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

  describe('PUT /users/current', () => {
    it('should return 204 on success', async () => {
      await Account.create(makeAccount)

      const { status } = await request(app)
        .put('/users/current')
        .set({ authorization: `Bearer: ${token}` })
        .send({ email: 'any_email2@gmail.com', firstName: 'any_name2' })

      expect(status).toBe(204)
      const account = await Account.findOne({ where: { id: 1 } })
      expect(account).toMatchObject({ email: 'any_email2@gmail.com', firstName: 'any_name2' })
    })
  })

  describe('PUT /users/current/password', () => {
    it('should return 204 on success', async () => {
      const hashPassword = await hash('any_password', 12)
      await Account.create({ ...makeAccount, password: hashPassword })

      const { status } = await request(app)
        .put('/users/current/password')
        .set({ authorization: `Bearer: ${token}` })
        .send({ currentPassword: 'any_password', newPassword: 'new_password' })

      expect(status).toBe(204)
    })
  })
})
