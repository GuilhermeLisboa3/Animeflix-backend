import { PaginationParams } from '@/domain/entities'
import { SearchAnimesByNameUseCase, SearchAnimesByName } from '@/domain/usecases/anime'
import { ListAnimeByName } from '@/domain/contracts/database/anime'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/entities/pagination-params')

describe('SearchAnimesByNameUseCase', () => {
  let animeRepository: MockProxy<ListAnimeByName>
  let makeParams: { page: string, perPage: string, name: string }
  let sut: SearchAnimesByName

  beforeAll(() => {
    makeParams = { page: '1', perPage: '10', name: 'any_name' }
    animeRepository = mock()
    animeRepository.listByName.mockResolvedValue({ animes: [], page: 1, perPage: 10, count: 0 })
  })

  beforeEach(() => {
    sut = SearchAnimesByNameUseCase(animeRepository)
  })

  it('should call ListAnimeByName with PaginationParams and input', async () => {
    jest.mocked(PaginationParams).mockImplementationOnce(jest.fn().mockImplementationOnce(() => {
      return { pageNumber: 1, perPageNumber: 10 }
    }))
    await sut(makeParams)

    expect(animeRepository.listByName).toHaveBeenCalledWith({ page: 1, perPage: 10, name: 'any_name' })
    expect(animeRepository.listByName).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if ListAnimeByName throw', async () => {
    const error = new Error('infa_error')
    animeRepository.listByName.mockRejectedValueOnce(error)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return list anime on success', async () => {
    const listCategories = await sut(makeParams)

    expect(listCategories).toEqual({ animes: [], page: 1, perPage: 10, count: 0 })
  })
})
