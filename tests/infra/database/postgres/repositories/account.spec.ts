import { AccountRepository } from '@/infra/database/postgres/repositories'
import { Account, sequelize } from '@/infra/database/postgres/entities'

import MockDate from 'mockdate'

describe('AccountRepository', () => {
  let sut: AccountRepository
  let makeAccount: { firstName: string, lastName: string, email: string, password: string, birth: Date, phone: string, role: 'user' | 'admin' }

  beforeAll(async () => {
    MockDate.set(new Date())
    makeAccount = {
      firstName: 'any_name',
      lastName: 'any_last_name',
      email: 'any_email',
      password: 'any_password',
      birth: new Date(),
      phone: 'any_phone',
      role: 'user'
    }
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
    sut = new AccountRepository()
  })

  afterAll(async () => {
    await sequelize.close()
    MockDate.reset()
  })

  describe('checkByEmail', () => {
    it('should return true if email exists', async () => {
      await Account.create(makeAccount)

      const existAccount = await sut.checkByEmail('any_email')

      expect(existAccount).toBeTruthy()
    })

    it('should return false if email not exists', async () => {
      const existAccount = await sut.checkByEmail('any_email')

      expect(existAccount).toBeFalsy()
    })
  })

  describe('create', () => {
    it('should create account on success', async () => {
      const existAccount = await sut.create({
        firstName: 'any_name',
        lastName: 'any_last_name',
        email: 'any_email',
        password: 'any_password',
        birth: new Date(),
        phone: 'any_phone'
      })

      expect(existAccount).toBeTruthy()
    })
  })

  describe('loadByEmail', () => {
    it('should return an account if it exists', async () => {
      await Account.create(makeAccount)

      const account = await sut.loadByEmail('any_email')

      expect(account).toEqual({ id: '1', password: 'any_password' })
    })

    it('should return undefined if account not exists', async () => {
      const account = await sut.loadByEmail('any_email')

      expect(account).toBeUndefined()
    })
  })

  describe('checkRole', () => {
    it('should return false if account does not exists', async () => {
      const account = await sut.checkRole({ accountId: '1' })

      expect(account).toBeFalsy()
    })

    it('should return true if account exists without role', async () => {
      await Account.create(makeAccount)

      const account = await sut.checkRole({ accountId: '1' })

      expect(account).toBeTruthy()
    })

    it('should return false if the route require role admin and the account is user', async () => {
      await Account.create(makeAccount)

      const account = await sut.checkRole({ accountId: '1', role: 'admin' })

      expect(account).toBeFalsy()
    })

    it('should return true if the route require role user and the account is admin', async () => {
      await Account.create({ ...makeAccount, role: 'admin' })

      const account = await sut.checkRole({ accountId: '1', role: 'user' })

      expect(account).toBeTruthy()
    })
  })

  describe('loadById', () => {
    it('should return account on success', async () => {
      await Account.create(makeAccount)

      const account = await sut.loadById({ id: '1' })

      expect(account).toMatchObject({
        firstName: 'any_name',
        lastName: 'any_last_name',
        email: 'any_email',
        password: 'any_password',
        birth: new Date(),
        phone: 'any_phone',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })

    it('should return undefined if account not exists', async () => {
      const account = await sut.loadById({ id: '1' })

      expect(account).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should update account on success', async () => {
      await Account.create(makeAccount)

      await sut.update({
        id: '1',
        firstName: 'any_name2',
        lastName: 'any_last_name2',
        email: 'any_email2',
        password: 'any_password2',
        phone: 'any_phone2'
      })

      const account = await Account.findOne({ where: { id: 1 } })

      expect(account).toMatchObject({
        firstName: 'any_name2',
        lastName: 'any_last_name2',
        email: 'any_email2',
        password: 'any_password2',
        phone: 'any_phone2'
      })
    })
  })

  describe('checkById', () => {
    it('should return true if account exists', async () => {
      await Account.create(makeAccount)

      const existAccount = await sut.checkById({ id: 1 })

      expect(existAccount).toBeTruthy()
    })
  })
})
