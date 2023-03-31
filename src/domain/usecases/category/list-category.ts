import { ListAllCategories } from '@/domain/contracts/database/category'
import { PaginationParams } from '@/domain/entities'

type Setup = (categoryRepository: ListAllCategories) => ListCategory
type Input = { page?: string, perPage?: string }
type Output = { categories: Array<{ id: string, name: string, position: number }>, page: number, perPage: number, count: number }
export type ListCategory = (input: Input) => Promise<Output>

export const ListCategoryUseCase: Setup = (categoryRepository) => async ({ page, perPage }) => {
  const { pageNumber, perPageNumber } = new PaginationParams(page, perPage)
  return await categoryRepository.list({ page: pageNumber, perPage: perPageNumber })
}
