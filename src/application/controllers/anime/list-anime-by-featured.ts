import { ListAnimeFeatured } from '@/domain/usecases/anime'

export class ListAnimeByFeaturedController {
  constructor (private readonly listAnimeFeatured: ListAnimeFeatured) {}

  async perform (): Promise<void> {
    await this.listAnimeFeatured()
  }
}
