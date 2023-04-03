import { HttpResponse, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { GetWatchTime } from '@/domain/usecases/watch-time'

type HttpRequest = { accountId: string, id: string }

export class GetWatchTimeController {
  constructor (private readonly getWatchTime: GetWatchTime) {}

  async perform ({ accountId, id }: HttpRequest): Promise<HttpResponse> {
    const seconds = await this.getWatchTime({ accountId, episodeId: id })
    return ok(seconds)
  }

  buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...build.of(id, 'id').required().build()
    ]
  }
}
