import { IRestaurantCheckout } from "@/models";
import { metadata } from "@/models/metadata";
import { inject, injectable } from "inversify";
import { OrderConditionOption } from "@/models/restaurantCheckout";
import MetadataService from "./metadata.service";
import ApiService from "./api.service";

@injectable()
export default class RestaurantService {
  private baseResource: Array<string>;

  @inject(ApiService) private ApiSvc!: ApiService;

  @inject(MetadataService) private MetadataSvc!: MetadataService;

  constructor() {
    this.baseResource = ["api/restaurants", "checkout"];
  }

  public getCheckoutConditions(): Array<OrderConditionOption> {
    return [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        label: "No Order Conditions"
      }
    ];
  }

  public get(id: string): Promise<IRestaurantCheckout> {
    return this.ApiSvc.get<IRestaurantCheckout>(
      `${this.baseResource[0]}/${id}/${this.baseResource[1]}`
    );
  }

  public update(id: string, updatedCheckout: IRestaurantCheckout): Promise<IRestaurantCheckout> {
    return this.ApiSvc.put<IRestaurantCheckout>(
      `${this.baseResource[0]}/${id}/${this.baseResource[1]}`,
      updatedCheckout
    );
  }

  public getMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(`${this.baseResource[0]}/${this.baseResource[1]}`);
  }
}
