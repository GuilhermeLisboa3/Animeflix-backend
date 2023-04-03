import { AddWatchTimeController } from '@/application/controllers/watch-time'
import { makeAddWatchTime } from '@/main/factories/domain/usecases/watch-time'

export const makeAddWatchTimeController = (): AddWatchTimeController => {
  return new AddWatchTimeController(makeAddWatchTime())
}
