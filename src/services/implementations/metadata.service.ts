import { injectable } from "inversify";
import { metadata } from "@/models/metadata";
import { IMetadataService } from "../interfaces";

const restMock = require("@/metadata/restaurantInfoMetadata.json");
const orderSetupMetadata = require("@/metadata/orderSetupTimeMetadata.json");
const closingsMetadata = require("@/metadata/closingsMetadata.json");
const bulkFormClosingsMetadata = require("@/metadata/bulkClosingsMetadata.json");
const formClosingsMetadata = require("@/metadata/closingsMetadata.json");
const restaurantCheckoutMetadata = require("@/metadata/restaurantCheckoutMetadata.json");
const restaurantListPaymentMethodMetadata = require("@/metadata/listPaymentMethodMetadata.json");
const restaurantAddPaymentMethodMetadata = require("@/metadata/addPaymentMethodMetadata.json");
const restaurantOperatingHoursMetadata = require("@/metadata/restaurant/hours-of-operation/restaurantOperatingHoursMetadata.json");
const onoRestaurantBaseMetadata = require("@/metadata/restaurant/onoRestaurantBaseMetadata.json");
const restaurantList = require("@/metadata/restaurant/restaurantListMetadata.json");
const filterComponentMetadata = require("@/metadata/list/filterMetadata.json");
const listMetadata = require("@/metadata/list/onoListMetadata.json");
const inputDateExtension = require("@/metadata/inputs/onoInputDateExtensionMetadata.json");
const inputTimeExtension = require("@/metadata/inputs/onoInputTimeExtensionMetadata.json");
const inputToggleBtn = require("@/metadata/inputs/onoToggleButtonMetadata.json");
const headerMetadata = require("@/metadata/general/onoHeaderMetadata.json");
const activityLogMetadata = require("@/metadata/activityLogMetadata.json");
const leadTimeListMetadata = require("@/metadata/leadTimeListMetadata.json");

const mockFilesDictionary: { [key: string]: metadata } = {
  "api/restaurants": restMock,
  "api/restaurants/base": onoRestaurantBaseMetadata,
  "api/operatinghoursconfigurations": restaurantOperatingHoursMetadata,
  "api/restaurants/increments": orderSetupMetadata,
  "api/restaurants/closings": closingsMetadata,
  "api/restaurants/bulk-formClosings": bulkFormClosingsMetadata,
  "api/restaurants/formClosings": formClosingsMetadata,
  "api/restaurants/checkout": restaurantCheckoutMetadata,
  "api/restaurants/list-paymentmethods": restaurantListPaymentMethodMetadata,
  "api/restaurants/add-paymentmethods": restaurantAddPaymentMethodMetadata,
  "api/leadTimeConfigurations": leadTimeListMetadata,
  "api/restaurants/list": restaurantList,
  "api/list/filter": filterComponentMetadata,
  "api/list": listMetadata,
  "api/inputs/date-extension": inputDateExtension,
  "api/inputs/time-extension": inputTimeExtension,
  "api/inputs/toggle": inputToggleBtn,
  "api/general/header": headerMetadata,
  "api/auditlogs": activityLogMetadata
};

@injectable()
export default class MetadataService implements IMetadataService {
  public getModelMetadata(resource: string): Promise<metadata> {
    const metaData: metadata = mockFilesDictionary[resource];
    return new Promise<metadata>(resolve => resolve(metaData));
  }
}
