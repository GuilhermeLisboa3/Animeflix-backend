import { ListAnimeNewest } from '@/domain/usecases/anime'

export class ListAnimeNewestController {
  constructor (private readonly listAnimeFeatured: ListAnimeNewest) {}

  async perform (): Promise<void> {
    await this.listAnimeFeatured()
  }
}
