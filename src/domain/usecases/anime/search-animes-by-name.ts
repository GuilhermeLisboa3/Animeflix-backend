import { ListAnimeByName } from '@/domain/contracts/database/anime'
import { PaginationParams } from '@/domain/entities'

type Setup = (animeRepository: ListAnimeByName) => SearchAnimesByName
type Input = { page?: string, perPage?: string, name: string }
type Output = { animes: Array<{ id: number, name: string, thumbnailUrl: string, synopsis: string }>, page: number, perPage: number, count: number }
export type SearchAnimesByName = (input: Input) => Promise<Output>

export const SearchAnimesByNameUseCase: Setup = (animeRepository) => async ({ page, perPage, name }) => {
  const { pageNumber, perPageNumber } = new PaginationParams(page, perPage)
  return await animeRepository.listByName({ page: pageNumber, perPage: perPageNumber, name })
}
