import Column from "./column";

export default class Table {
  columns: Column[];

  constructor(columns: Column[]) {
    this.columns = columns;
  }
}
