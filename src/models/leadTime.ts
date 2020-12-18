import FulfillmentTypes from "./fulfillmentTypes";

export default class LeadTime {
  public id?: string;

  public leadTimeMinutes?: number;

  public nextBusinessDay?: boolean;

  public orderConditionID?: string;

  public toGo?: FulfillmentTypes;

  public catering?: FulfillmentTypes;
}
