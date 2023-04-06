import { TopTenAnimesByLike } from '@/domain/usecases/anime'

export class GetTopTenAnimesByLikesController {
  constructor (private readonly topTenAnimesByLike: TopTenAnimesByLike) {}

  async perform (): Promise<void> {
    await this.topTenAnimesByLike()
  }
}
