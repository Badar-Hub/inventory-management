import FulfillmentTypes from "./fulfillmentTypes";

export default interface OrderSetupTimeIncrement {
  id: string;
  fulfillmentTypesToGo: FulfillmentTypes;
  fulfillmentTypesCatering: FulfillmentTypes;
  timeIncrement: number;
}
