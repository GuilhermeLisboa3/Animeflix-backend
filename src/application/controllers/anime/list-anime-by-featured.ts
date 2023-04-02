import { HttpResponse, ok } from '@/application/helpers'
import { ListAnimeFeatured } from '@/domain/usecases/anime'

export class ListAnimeByFeaturedController {
  constructor (private readonly listAnimeFeatured: ListAnimeFeatured) {}

  async perform (): Promise<HttpResponse> {
    const listAnimes = await this.listAnimeFeatured()
    return ok(listAnimes)
  }
}
