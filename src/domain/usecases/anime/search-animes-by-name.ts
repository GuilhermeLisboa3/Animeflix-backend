import { ListAnimeByName } from '@/domain/contracts/database/anime'
import { PaginationParams } from '@/domain/entities'

type Setup = (animeRepository: ListAnimeByName) => SearchAnimesByName
type Input = { page?: string, perPage?: string, name: string }
export type SearchAnimesByName = (input: Input) => Promise<void>

export const SearchAnimesByNameUseCase: Setup = (animeRepository) => async ({ page, perPage, name }) => {
  const { pageNumber, perPageNumber } = new PaginationParams(page, perPage)
  await animeRepository.listByName({ page: pageNumber, perPage: perPageNumber, name })
}
