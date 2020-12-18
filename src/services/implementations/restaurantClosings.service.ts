import { inject, injectable } from "inversify";
import {
  FulfillmentTypes,
  IRestaurantClosing,
  OnoError,
  PagedRequest,
  PagedResult
} from "@/models";
import { CollectionMetadata, metadata } from "@/models/metadata";
import RestaurantClosingViewModel from "@/view-models/restaurant/closings/restaurantClosing";
import DateFnsAdapter from "@date-io/date-fns";
import ApiService from "./api.service";
import MetadataService from "./metadata.service";
import ValuesService from "./values.service";

@injectable()
export default class RestaurantClosingService {
  private baseResource: Array<string>;

  @inject(ApiService) private ApiSvc!: ApiService;

  @inject(MetadataService) private MetadataSvc!: MetadataService;

  @inject(ValuesService) private ValuesSvc!: ValuesService;

  constructor() {
    this.baseResource = ["api/restaurants", "closings"];
  }

  public get(id: string, page: PagedRequest): Promise<PagedResult<IRestaurantClosing>> {
    return new Promise<PagedResult<IRestaurantClosing>>((resolve, reject) => {
      this.ApiSvc.getPaged<PagedResult<IRestaurantClosing>>(
        `${this.baseResource[0]}/${id}/${this.baseResource[1]}`,
        page
      )
        .then(data => {
          const mappedData: PagedResult<IRestaurantClosing> = {
            ...data,
            results: data.results.map(x => {
              const closingDateTime = new Date(x.closeDateTime);
              const resumeDateTime = new Date(x.resumeNormalOperatingHours);
              const dateFns = new DateFnsAdapter();
              const result: IRestaurantClosing = {
                id: x.id,
                closeDateTime: dateFns.format(closingDateTime, "keyboardDateTime"),
                resumeNormalOperatingHours: dateFns.format(resumeDateTime, "keyboardDateTime"),
                fulfillmentTypes: x.fulfillmentTypes
              };
              return result;
            })
          };
          resolve(mappedData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public convertToViewModel(model: IRestaurantClosing): RestaurantClosingViewModel {
    const closeDateTime = new Date(model.closeDateTime);
    const resumeNormalOperatingHours = new Date(model.resumeNormalOperatingHours);

    const dateFns: DateFnsAdapter = new DateFnsAdapter();

    const mappedData: RestaurantClosingViewModel = {
      id: model.id,
      closeDate: dateFns.format(closeDateTime, "keyboardDate"),
      closeTime: dateFns.format(closeDateTime, "fullTime12h"),
      resumeNormalOperatingDate: dateFns.format(resumeNormalOperatingHours, "keyboardDate"),
      resumeNormalOperatingTime: dateFns.format(resumeNormalOperatingHours, "fullTime12h"),
      togoFulfillment: model.fulfillmentTypes.split(", ").map(x => {
        return x as FulfillmentTypes;
      })
    };
    return mappedData;
  }

  public getCollectionMetadata(id: string): Promise<CollectionMetadata> {
    return this.ApiSvc.get<CollectionMetadata>(
      `${this.baseResource[0]}/${id}/${this.baseResource[1]}/$metadata`
    );
  }

  public create(restaurantId: string, newRestaurantClosing: IRestaurantClosing): Promise<string> {
    return this.ApiSvc.post<string>(
      `${this.baseResource[0]}/${restaurantId}/${this.baseResource[1]}`,
      newRestaurantClosing
    );
  }

  public createBulk(ids: Array<string>, newRestaurantClosing: IRestaurantClosing): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let totalCreated = 0;
      ids.forEach(id => {
        this.create(id, newRestaurantClosing)
          .then(res => {
            totalCreated += 1;

            if (totalCreated === ids.length) resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  public getMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(`${this.baseResource[0]}/${this.baseResource[1]}`);
  }

  public getFormMetadata(isBulk: boolean): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(
      `${this.baseResource[0]}/${isBulk ? "bulk-" : ""}formClosings`
    );
  }

  public delete(parentID: string, childID: string): Promise<boolean> {
    try {
      return this.ApiSvc.delete<boolean>(
        `${this.baseResource[0]}/${parentID}/${this.baseResource[1]}/${childID}`
      );
    } catch (error) {
      throw new OnoError("Could Not Delete Restaurant Closing", error);
    }
  }

  public update(
    id: string,
    childID: string,
    restaurantClosing: IRestaurantClosing
  ): Promise<IRestaurantClosing> {
    return this.ApiSvc.put<IRestaurantClosing>(
      `${this.baseResource[0]}/${id}/${this.baseResource[1]}/${childID}`,
      restaurantClosing
    );
  }
}
