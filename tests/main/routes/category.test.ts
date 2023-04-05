import { app } from '@/main/config/app'
import env from '@/main/config/env'
import { sequelize, Account, Category } from '@/infra/database/postgres/entities'

import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { RequiredFieldError } from '@/application/errors'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

describe('CategoryRoute', () => {
  let token: string
  const makeAccount = { firstName: 'any_name', lastName: 'any_last_name', email: 'any_email@gmail.com', password: 'any_password', birth: new Date(), phone: 'any_phone' }

  beforeAll(async () => {
    token = sign({ key: '1' }, env.secret)
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    await Account.create({ ...makeAccount, role: 'admin' })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('POST /category', () => {
    it('should return 204 on success', async () => {
      const { status, body } = await request(app)
        .post('/category')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_category', position: 1 })

      expect(status).toBe(204)
      expect(body).toBeTruthy()
    })

    it('should return 400 if any data is not supplied', async () => {
      const { status, body: { error } } = await request(app)
        .post('/category')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_name' })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('position').message)
    })

    it('should return 400 if category already exists', async () => {
      await Category.create({ name: 'any_name', position: 1 })
      const { status, body: { error } } = await request(app)
        .post('/category')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_name', position: 1 })

      expect(status).toBe(400)
      expect(error).toBe(new FieldInUseError('name or position').message)
    })
  })

  describe('GET /categories', () => {
    it('should return 200 on success', async () => {
      await Category.create({ name: 'any_name', position: 1 })

      const { status, body } = await request(app)
        .get('/categories')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toEqual({
        categories: [{ id: 1, name: 'any_name', position: 1 }],
        page: 1,
        perPage: 10,
        count: 1
      })
    })
  })

  describe('DELETE /category/:id', () => {
    it('should return 204 on success', async () => {
      await Category.create({ name: 'any_name', position: 1 })
      const id = 1

      const { status } = await request(app)
        .delete(`/category/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
    })

    it('should return 400 if category not exists', async () => {
      const id = 1

      const { status, body: { error } } = await request(app)
        .delete(`/category/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new NotFoundError('category').message)
    })
  })

  describe('GET /categories/:id', () => {
    it('should return 200 on success', async () => {
      await Category.create({ name: 'any_name', position: 1 })

      const { status, body } = await request(app)
        .get(`/categories/${1}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toEqual({ id: '1', name: 'any_name', position: 1, animes: [] })
    })

    it('should return 400 if category not exists', async () => {
      const { status, body: { error } } = await request(app)
        .get(`/categories/${1}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new NotFoundError('categoryId').message)
    })
  })
})
