import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { TopTenAnimesByLike } from '@/domain/usecases/anime'

export class GetTopTenAnimesByLikesController extends Controller {
  constructor (private readonly topTenAnimesByLike: TopTenAnimesByLike) { super() }

  async perform (): Promise<HttpResponse> {
    const topTenAnimes = await this.topTenAnimesByLike()
    return ok(topTenAnimes)
  }
}
