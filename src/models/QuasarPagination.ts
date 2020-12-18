export default class QuasarPagination {
  page: number = 0;

  rowsPerPage: number = 0;

  rowsNumber: number;

  descending: boolean;

  sortBy: string;

  constructor(
    page: any,
    rowsPerPage: number,
    rowsNumber: number,
    descending: boolean,
    sortBy: string
  ) {
    this.page = page;

    if (rowsPerPage === 0) {
      rowsPerPage = 10;
    }

    this.rowsPerPage = rowsPerPage;
    this.rowsNumber = rowsNumber;
    this.descending = descending;
    this.sortBy = sortBy;
  }

  getURLQuery(): any {
    const result: any = {};
    if (this.sortBy !== "") {
      result.sortBy = this.sortBy;
    }

    if (this.rowsPerPage !== 10) {
      result.rowsPerPage = this.rowsPerPage;
    }

    if (this.descending !== false) {
      result.descending = this.descending;
    }

    if (this.page !== 1) {
      result.page = this.page;
    }
    return result;
  }
}
