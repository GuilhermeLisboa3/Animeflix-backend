import { JwtAdapter } from '@/infra/gateways'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  let fakeJwt: jest.Mocked<typeof jwt>
  let secret: string
  let sut: JwtAdapter

  beforeAll(() => {
    secret = 'any_secret'
    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    sut = new JwtAdapter(secret)
  })

  describe('generate', () => {
    let key: string

    beforeAll(() => {
      key = 'any_key'
      fakeJwt.sign.mockImplementation(() => 'any_token')
    })

    it('should call sign with correct input', async () => {
      await sut.generate({ key })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: '1d' })
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })

    it('should rethrow if sign throw', async () => {
      const error = new Error('jwt_error')
      fakeJwt.sign.mockImplementationOnce(() => { throw error })

      const promise = sut.generate({ key })

      await expect(promise).rejects.toThrow(error)
    })

    it('should return token on success', async () => {
      const accessToken = await sut.generate({ key })

      expect(accessToken).toBe('any_token')
    })
  })

  describe('validate', () => {
    let token: string

    beforeAll(() => {
      token = 'any_token'
      fakeJwt.verify.mockImplementation(() => ({ key: 'account_id' }))
    })

    it('should call verify with correct input', async () => {
      await sut.validate({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1)
    })

    it('should rethrow if verify throw', async () => {
      const error = new Error('jwt_error')
      fakeJwt.verify.mockImplementationOnce(() => { throw error })

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow(error)
    })

    it('should return id on success', async () => {
      const accountId = await sut.validate({ token })

      expect(accountId).toBe('account_id')
    })
  })
})
