import { ListAllCategories } from '@/domain/contracts/database/category'
import { PaginationParams } from '@/domain/entities'

type Setup = (categoryRepository: ListAllCategories) => ListCategory
type Input = { page?: string, perPage?: string }
export type ListCategory = (input: Input) => Promise<void>

export const ListCategoryUseCase: Setup = (categoryRepository) => async ({ page, perPage }) => {
  const { pageNumber, perPageNumber } = new PaginationParams(page, perPage)
  await categoryRepository.list({ page: pageNumber, perPage: perPageNumber })
}
