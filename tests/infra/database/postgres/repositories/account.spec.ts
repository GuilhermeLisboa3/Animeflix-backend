import { AccountRepository } from '@/infra/database/postgres/repositories'
import { Account, sequelize } from '@/infra/database/postgres/entities'

describe('AccountRepository', () => {
  let sut: AccountRepository
  let makeAccount: { firstName: string, lastName: string, email: string, password: string, birth: Date, phone: string, role: 'user' | 'admin' }

  beforeAll(async () => {
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
})
