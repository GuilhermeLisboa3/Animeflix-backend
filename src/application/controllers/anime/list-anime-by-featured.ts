import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ListAnimeFeatured } from '@/domain/usecases/anime'

export class ListAnimeByFeaturedController extends Controller {
  constructor (private readonly listAnimeFeatured: ListAnimeFeatured) { super() }

  async perform (): Promise<HttpResponse> {
    const listAnimes = await this.listAnimeFeatured()
    return ok(listAnimes)
  }
}
