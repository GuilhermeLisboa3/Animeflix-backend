import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { DeleteEpisode } from '@/domain/usecases/episode'

type HttpRequest = { id: string }

export class DeleteEpisodeController extends Controller {
  constructor (private readonly deleteEpisode: DeleteEpisode) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteEpisode({ episodeId: id })
    return noContent()
  }
}
