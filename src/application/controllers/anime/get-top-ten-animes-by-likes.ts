import { HttpResponse, ok } from '@/application/helpers'
import { TopTenAnimesByLike } from '@/domain/usecases/anime'

export class GetTopTenAnimesByLikesController {
  constructor (private readonly topTenAnimesByLike: TopTenAnimesByLike) {}

  async perform (): Promise<HttpResponse> {
    const topTenAnimes = await this.topTenAnimesByLike()
    return ok(topTenAnimes)
  }
}
