import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { AddWatchTime } from '@/domain/usecases/watch-time'

type HttpRequest = { accountId: string, id: string, seconds: number }

export class AddWatchTimeController extends Controller {
  constructor (private readonly addWatchTime: AddWatchTime) { super() }

  async perform ({ accountId, id, seconds }: HttpRequest): Promise<HttpResponse> {
    await this.addWatchTime({ accountId: Number(accountId), episodeId: Number(id), seconds })
    return noContent()
  }

  override buildValidators ({ id, seconds }: HttpRequest): Validator[] {
    return [
      ...build.of(id, 'id').required().build(),
      ...build.of(seconds, 'seconds').required().build()
    ]
  }
}
