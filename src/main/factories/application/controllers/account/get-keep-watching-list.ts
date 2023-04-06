import { GetKeepWatchingListController } from '@/application/controllers/account'
import { makeKeepWatchingList } from '@/main/factories/domain/usecases/account'

export const makeGetKeepWatchingListController = (): GetKeepWatchingListController => {
  return new GetKeepWatchingListController(makeKeepWatchingList())
}
