import { HttpResponse, noContent } from '@/application/helpers'
import { DeleteEpisode } from '@/domain/usecases/episode'

type HttpRequest = { id: string }

export class DeleteEpisodeController {
  constructor (private readonly deleteEpisode: DeleteEpisode) {}

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteEpisode({ episodeId: id })
    return noContent()
  }
}
