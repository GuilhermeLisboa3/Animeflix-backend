import { BcryptAdapter } from '@/infra/gateways'

export const makeHashAdapter = (): BcryptAdapter => {
  const salt = 12
  return new BcryptAdapter(salt)
}
