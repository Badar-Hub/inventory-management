import FulfillmentTypes from "./fulfillmentTypes";
import TimeFrame from "./timeFrame";

export default interface OperatingHours {
  id: string;

  businessHours: boolean;

  toGo: FulfillmentTypes;

  catering: FulfillmentTypes;

  timeFrames: Array<TimeFrame>;
}
