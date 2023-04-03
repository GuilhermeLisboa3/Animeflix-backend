import { HttpResponse, ok } from '@/application/helpers'
import { ListAnimeNewest } from '@/domain/usecases/anime'

export class ListAnimeNewestController {
  constructor (private readonly listAnimeFeatured: ListAnimeNewest) {}

  async perform (): Promise<HttpResponse> {
    const listAnime = await this.listAnimeFeatured()
    return ok(listAnime)
  }
}
