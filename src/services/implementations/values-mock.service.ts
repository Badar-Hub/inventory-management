import { injectable } from "inversify";

export type ListValue = string[] | { [key: string]: any }[];

@injectable()
export default class ValuesMockService {
  private values: Record<string, string> = {};

  private listValues: Record<string, ListValue> = {};

  public get(key: string): string {
    return this.values[key];
  }

  public getList(key: string): ListValue {
    return this.listValues[key];
  }

  constructor() {
    this.listValues.USSTATES = [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY"
    ];

    this.listValues.OwnershipTypes = ["Not Set", "Corporate", "Franchisee"];

    this.listValues.DOTW = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    this.listValues.MOTY = [
      "February",
      "January",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.listValues.TimeZones = ["Eastern Time", "Central Time", "Western Time"];

    this.listValues.FullfillmentTypes = [
      {
        label: "Dine In",
        value: "1"
      },
      {
        label: "Curbside",
        value: "2"
      },
      {
        label: "Drive Thru",
        value: "4"
      },
      {
        label: "Pickup",
        value: "8"
      },
      {
        label: "Delivery",
        value: "16"
      }
    ];
  }
}
