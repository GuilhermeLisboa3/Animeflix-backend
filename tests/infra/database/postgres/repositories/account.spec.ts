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
  })
})
