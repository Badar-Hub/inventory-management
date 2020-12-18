export default interface PagedResult<T> {
  currentPage: number;

  pageSize: number;

  rowCount: number;

  pageCount: number;

  results: Array<T>;
}
