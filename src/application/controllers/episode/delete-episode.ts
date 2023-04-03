import { DeleteEpisode } from '@/domain/usecases/episode'

type HttpRequest = { id: string }

export class DeleteEpisodeController {
  constructor (private readonly deleteEpisode: DeleteEpisode) {}

  async perform ({ id }: HttpRequest): Promise<void> {
    await this.deleteEpisode({ episodeId: id })
  }
}
