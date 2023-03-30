import { BcryptAdapter } from '@/infra/gateways'

import bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  let fakeBcrypt: jest.Mocked<typeof bcrypt>
  let salt: number
  let sut: BcryptAdapter
  let plaintext: string
  let digest: string

  beforeAll(() => {
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
    fakeBcrypt.hash.mockImplementation(() => 'any_hash_value')
    fakeBcrypt.compare.mockImplementation(() => true)
    salt = 12
    plaintext = 'any_value'
    digest = 'any_encrypt_password'
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

  describe('comparer', () => {
    it('should call compare with correct input', async () => {
      await sut.comparer({ plaintext, digest })

      expect(fakeBcrypt.compare).toHaveBeenCalledWith('any_value', 'any_encrypt_password')
      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1)
    })

    it('should return false if the values are different', async () => {
      fakeBcrypt.compare.mockImplementationOnce(() => false)

      const isValid = await sut.comparer({ plaintext: 'invalid_password', digest })

      expect(isValid).toBeFalsy()
    })

    it('should return true if the values are equal', async () => {
      const isValid = await sut.comparer({ plaintext: 'invalid_password', digest })

      expect(isValid).toBeTruthy()
    })
  })
})
