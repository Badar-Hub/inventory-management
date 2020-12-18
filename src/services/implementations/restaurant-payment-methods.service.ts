import { inject, injectable } from "inversify";
import {
  CollectionMetadata,
  IRestaurantPaymentMethod,
  metadata,
  PagedRequest,
  PagedResult
} from "@/models";
import ApiService from "./api.service";
import MetadataService from "./metadata.service";

@injectable()
export default class PaymentMethodsService {
  private baseResource: Array<string>;

  @inject(ApiService) private ApiSvc!: ApiService;

  @inject(MetadataService) private MetadataSvc!: MetadataService;

  constructor() {
    this.baseResource = ["api/restaurants", "paymentmethods", "orderconditions"];
  }

  public getCollectionMetadata(restaurantId: string): Promise<CollectionMetadata> {
    return this.ApiSvc.get<CollectionMetadata>(
      `${this.baseResource[0]}/${restaurantId}/${this.baseResource[1]}/$metadata`
    );
  }

  public getListMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(
      `${this.baseResource[0]}/list-${this.baseResource[1]}`
    );
  }

  public getAddDialogMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(`${this.baseResource[0]}/add-${this.baseResource[1]}`);
  }

  public getPaymentTypes(): Promise<string[]> {
    return this.ApiSvc.get(`${this.baseResource[0]}/${this.baseResource[2]}/values`);
  }

  public get(
    restaurantId: string,
    page: PagedRequest
  ): Promise<PagedResult<IRestaurantPaymentMethod>> {
    return this.ApiSvc.getPaged<PagedResult<IRestaurantPaymentMethod>>(
      `${this.baseResource[0]}/${restaurantId}/${this.baseResource[1]}`,
      page
    );
  }

  public create(id: string, newPaymentMethod: IRestaurantPaymentMethod): Promise<string> {
    return this.ApiSvc.post<string>(
      `${this.baseResource[0]}/${id}/${this.baseResource[1]}`,
      newPaymentMethod
    );
  }

  public async createBulk(
    id: string,
    newPaymentMethods: IRestaurantPaymentMethod[]
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let totalCreated = 0;
      newPaymentMethods.forEach(paymentMethod => {
        this.create(id, {
          orderConditionID: paymentMethod.orderConditionID,
          paymentType: paymentMethod.paymentType.toString()
        })
          .then(res => {
            totalCreated += 1;

            if (totalCreated === newPaymentMethods.length) resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  public update(
    id: string,
    childID: string,
    updatedPaymentMethod: IRestaurantPaymentMethod
  ): Promise<IRestaurantPaymentMethod> {
    return this.ApiSvc.put<IRestaurantPaymentMethod>(
      `${this.baseResource[0]}/${id}/${this.baseResource[1]}/${childID}`,
      updatedPaymentMethod
    );
  }

  public delete(id: string, childID: string): Promise<boolean> {
    return this.ApiSvc.delete<boolean>(
      `${this.baseResource[0]}/${id}/${this.baseResource[1]}/${childID}`
    );
  }
}
