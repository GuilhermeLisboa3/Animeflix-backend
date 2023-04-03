import { GetWatchTimeController } from '@/application/controllers/watch-time'
import { makeGetWatchTime } from '@/main/factories/domain/usecases/watch-time'

export const makeGetWatchTimeController = (): GetWatchTimeController => {
  return new GetWatchTimeController(makeGetWatchTime())
}
