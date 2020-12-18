/* eslint-disable prefer-destructuring */
/* eslint-disable no-template-curly-in-string */
import FilterOperator from "./filterOperator";

export default class Filter {
  column: string = "";

  operator?: FilterOperator;

  operatorModel?: { label: string; value: string };

  value?: string;

  private formatString(a: string, stuff: string[]) {
    stuff.forEach((thing, idx) => {
      a = a.replace(`{${idx}}`, stuff[idx]);
    });

    return a;
  }

  buildOperatorReq(operator: string): string {
    let resultFormat: string = "";

    switch (operator) {
      case "Contains":
        resultFormat = "substringof({0},'{1}')";
        break;
      case "NotContains":
        resultFormat = "not substringof({0},'{1}')";
        break;
      case "Equals":
        resultFormat = "{0} eq '{1}'";
        break;
      case "NotEquals":
        resultFormat = "{0} ne '{1}'";
        break;
      case "LessThan":
        resultFormat = "{0} lt '{1}'";
        break;
      case "GreaterThan":
        resultFormat = "{0} gt '{1}'";
        break;
      case "LessThanEqualTo":
        resultFormat = "{0} lte '{1}'";
        break;
      case "GreaterThanEqualTo":
        resultFormat = "{0} gte '{1}'";
        break;
      default:
        resultFormat = "";
    }
    return resultFormat;
  }

  public toString(): string {
    const operatorResult = this.buildOperatorReq(this.operator!);
    const result = this.formatString(operatorResult, [this.column, this.value!]);
    return result;
  }

  public toURLString(): string {
    return `${this.column}|${this.operator!}|${this.value}`;
  }

  public fromURLString(urlString: string) {
    const splitURL: string[] = urlString.split("|");
    this.column = splitURL[0];
    const key = splitURL[1];
    const tmp = key as keyof typeof FilterOperator;
    this.operator = tmp as FilterOperator;
    this.operatorModel = {
      label: this.operator!,
      value: key
    };

    this.value = splitURL[2];
  }
}
