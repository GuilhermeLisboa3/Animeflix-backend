import { BcryptAdapter } from '@/infra/gateways'

import bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  let fakeBcrypt: jest.Mocked<typeof bcrypt>
  let salt: number
  let sut: BcryptAdapter
  let plaintext: string

  beforeAll(() => {
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
    fakeBcrypt.hash.mockImplementation(() => 'any_hash_value')
    salt = 12
    plaintext = 'any_value'
  })

  beforeEach(() => {
    sut = new BcryptAdapter(salt)
  })

  describe('generate', () => {
    it('should call hash with correct input', async () => {
      await sut.generate({ plaintext })

      expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_value', salt)
      expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1)
    })

    it('should return a digest on success', async () => {
      const hashValue = await sut.generate({ plaintext })

      expect(hashValue).toBe('any_hash_value')
    })

    it('should rethrow if hash throws', async () => {
      const error = new Error('hash_error')
      fakeBcrypt.hash.mockImplementationOnce(() => { throw error })

      const promise = sut.generate({ plaintext })

      await expect(promise).rejects.toThrow(error)
    })
  })
})
