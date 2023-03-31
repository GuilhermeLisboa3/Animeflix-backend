
export class PaginationParams {
  pageNumber: number
  perPageNumber: number

  constructor (page?: string, perPage?: string) {
    this.pageNumber = this.pageInNumber(page)
    this.perPageNumber = this.perPageInNumber(perPage)
  }

  private pageInNumber (page?: string): number {
    if (page && parseInt(page, 10) > 0) {
      return parseInt(page, 10)
    } else {
      return 1
    }
  }

  private perPageInNumber (perPage?: string): number {
    if (perPage && parseInt(perPage, 10) > 0) {
      return parseInt(perPage, 10)
    } else {
      return 10
    }
  }
}
