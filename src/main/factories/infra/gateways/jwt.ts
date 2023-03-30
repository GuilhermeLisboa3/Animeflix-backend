import { JwtAdapter } from '@/infra/gateways'
import env from '@/main/config/env'

export const makeTokenAdapter = (): JwtAdapter => {
  return new JwtAdapter(env.secret)
}
