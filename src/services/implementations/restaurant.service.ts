import { injectable, inject } from "inversify";

import {
  RestaurantInfo,
  RestaurantInfoList,
  PagedResult,
  PagedRequest,
  OnoError,
  metadata,
  CollectionMetadata
} from "@/models";
import RestaurantInfoValue from "@/models/restaurantInfoValue";
import ApiService from "./api.service";
import MetadataService from "./metadata.service";

@injectable()
export default class RestaurantService {
  private baseResource: string;

  @inject(ApiService) private ApiSvc!: ApiService;

  @inject(MetadataService) private MetadataSvc!: MetadataService;

  constructor() {
    this.baseResource = "api/restaurants";
  }

  public async get(page: PagedRequest): Promise<PagedResult<RestaurantInfoList>> {
    return this.ApiSvc.getPaged<PagedResult<RestaurantInfoList>>(`${this.baseResource}`, page);
  }

  public async getValues(): Promise<Array<RestaurantInfoValue>> {
    return this.ApiSvc.get<Array<RestaurantInfoValue>>(`${this.baseResource}/values`);
  }

  public create(newRestaurant: RestaurantInfo): Promise<RestaurantInfo> {
    return this.ApiSvc.post<RestaurantInfo>(`${this.baseResource}`, newRestaurant);
  }

  public getInfo(id: string): Promise<RestaurantInfo> {
    return this.ApiSvc.get<RestaurantInfo>(`${this.baseResource}/${id}`);
  }

  public getModelMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(this.baseResource);
  }

  public getBaseMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(`${this.baseResource}/base`);
  }

  public getListMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(`${this.baseResource}/list`);
  }

  public getCollectionMetadata(): Promise<CollectionMetadata> {
    return this.ApiSvc.get<CollectionMetadata>(`${this.baseResource}/$metadata`);
  }

  public async delete(id: string): Promise<boolean> {
    try {
      return this.ApiSvc.delete<boolean>(`${this.baseResource}/${id}`);
    } catch (error) {
      throw new OnoError("Could Not Delete Restaurant", error);
    }
  }

  public update(newRestaurant: RestaurantInfo): Promise<RestaurantInfo> {
    return this.ApiSvc.put<RestaurantInfo>(
      `${this.baseResource}/${newRestaurant.id}`,
      newRestaurant
    );
  }
}
