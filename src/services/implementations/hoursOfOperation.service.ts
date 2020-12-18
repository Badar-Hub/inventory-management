import { inject, injectable } from "inversify";
import { OperatingHours, OperatingHourConfigReference, OperatingHourValues } from "@/models";
import { metadata } from "@/models/metadata";
import ApiService from "./api.service";
import MetadataService from "./metadata.service";

@injectable()
export default class OperatingHoursService {
  private baseResource: string;

  @inject(ApiService) private ApiSvc!: ApiService;

  @inject(MetadataService) private MetadataSvc!: MetadataService;

  constructor() {
    this.baseResource = "api/operatinghoursconfigurations";
  }

  public getMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(this.baseResource);
  }

  public getOperatingHourConfigReference(
    restaurantID: string
  ): Promise<OperatingHourConfigReference> {
    return this.ApiSvc.get<OperatingHourConfigReference>(
      `api/restaurants/${restaurantID}/operatinghours`
    );
  }

  public async getOperatingHoursSet(
    operatingHoursConfigurationID: string
  ): Promise<OperatingHours[]> {
    return this.ApiSvc.get<OperatingHours[]>(
      `api/operatinghoursconfigurations/${operatingHoursConfigurationID}/operatinghours`
    );
  }

  public getOperatingHoursConfigsValues(): Promise<OperatingHourValues[]> {
    return this.ApiSvc.get<OperatingHourValues[]>(`api/operatingHoursConfigurations/values`);
  }

  public updateOperatingHours(
    restaurantID: string,
    operatingHourConfigID: string
  ): Promise<OperatingHourConfigReference> {
    return this.ApiSvc.put(`api/restaurants/${restaurantID}/operatinghours`, {
      operatingHoursConfigurationID: operatingHourConfigID
    });
  }
}
