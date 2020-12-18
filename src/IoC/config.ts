import "reflect-metadata";

import { Container } from "inversify";

import {
  ActivityLogService,
  ApiService,
  RestaurantService,
  ValuesService,
  MetadataService,
  RestaurantClosingService,
  OperatingHoursService,
  OrderSetupTimeIncrement,
  RestaurantCheckoutService,
  PyamentMethodService,
  ValuesMockService,
  leadTimeConfigurationsService,
  FilterService,
  UtilService
} from "@/services/implementations";
// import TAG from "../constants/tags";

const container = new Container();

container.bind<OperatingHoursService>(OperatingHoursService).toSelf();
container.bind<RestaurantService>(RestaurantService).toSelf();
container.bind<ApiService>(ApiService).toSelf();
container.bind<ValuesMockService>(ValuesMockService).toSelf();
container.bind<ValuesService>(ValuesService).toSelf();
container.bind<ActivityLogService>(ActivityLogService).toSelf();
container.bind<MetadataService>(MetadataService).toSelf();
container.bind<RestaurantClosingService>(RestaurantClosingService).toSelf();
container.bind<OrderSetupTimeIncrement>(OrderSetupTimeIncrement).toSelf();
container.bind<RestaurantCheckoutService>(RestaurantCheckoutService).toSelf();
container.bind<PyamentMethodService>(PyamentMethodService).toSelf();
container.bind<leadTimeConfigurationsService>(leadTimeConfigurationsService).toSelf();
container.bind<FilterService>(FilterService).toSelf();
container.bind<UtilService>(UtilService).toSelf();

export default container;
