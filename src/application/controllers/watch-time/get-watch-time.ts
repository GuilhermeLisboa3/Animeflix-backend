import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { GetWatchTime } from '@/domain/usecases/watch-time'

type HttpRequest = { accountId: string, id: string }

export class GetWatchTimeController extends Controller {
  constructor (private readonly getWatchTime: GetWatchTime) { super() }

  async perform ({ accountId, id }: HttpRequest): Promise<HttpResponse> {
    const seconds = await this.getWatchTime({ accountId, episodeId: id })
    return ok(seconds)
  }

  override buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...build.of(id, 'id').required().build()
    ]
  }
}
