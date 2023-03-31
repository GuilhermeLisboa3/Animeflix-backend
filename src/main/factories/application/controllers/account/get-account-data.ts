import { GetAccountDataController } from '@/application/controllers/account'
import { makeAccountRespository } from '@/main/factories/infra/database/postgres'

export const makeGetAccountDataController = (): GetAccountDataController => {
  return new GetAccountDataController(makeAccountRespository().loadById)
}
