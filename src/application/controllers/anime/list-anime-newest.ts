import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ListAnimeNewest } from '@/domain/usecases/anime'

export class ListAnimeNewestController extends Controller {
  constructor (private readonly listAnimeFeatured: ListAnimeNewest) { super() }

  async perform (): Promise<HttpResponse> {
    const listAnime = await this.listAnimeFeatured()
    return ok(listAnime)
  }
}
