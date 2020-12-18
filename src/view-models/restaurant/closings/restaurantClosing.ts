import { FulfillmentTypes } from "@/models";

type RestaurantClosingViewModel = {
  id?: string;

  closeDate: string;

  closeTime: string;

  resumeNormalOperatingDate: string;

  resumeNormalOperatingTime: string;

  togoFulfillment: Array<FulfillmentTypes>;
};

export default RestaurantClosingViewModel;
