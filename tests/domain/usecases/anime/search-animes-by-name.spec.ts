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
})
