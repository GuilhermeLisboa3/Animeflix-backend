import { AccountRepository } from '@/infra/database/postgres/repositories'

export const makeAccountRespository = (): AccountRepository => {
  return new AccountRepository()
}
