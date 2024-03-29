import { PaginationParams } from '@/domain/entities'

describe('PaginationParams', () => {
  it('should return page 1 and page 10 if the values are not given', () => {
    const sut = new PaginationParams()

    expect(sut.pageNumber).toBe(1)
    expect(sut.perPageNumber).toBe(10)
  })

  it('should return the given page and perPage number', () => {
    const sut = new PaginationParams('2', '6')

    expect(sut.pageNumber).toBe(2)
    expect(sut.perPageNumber).toBe(6)
  })
})
