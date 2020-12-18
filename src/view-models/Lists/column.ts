export default class Column {
  name: string;

  label: string;

  field: string;

  sortable: boolean = false;

  style?: string;

  align: string = "left";

  override: boolean = false;

  constructor(name: string, label: string, override: boolean = false, style: string = "") {
    this.name = name;
    this.label = label;
    this.field = name;
    this.style = style;
    this.override = override;
  }

  get templateName() {
    return `body-cell-${this.name}`;
  }
}
