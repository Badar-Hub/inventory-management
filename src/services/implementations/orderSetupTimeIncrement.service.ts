import { inject, injectable } from "inversify";
import { IOrderSetupTimeIcrement, OnoError } from "@/models";
import { metadata } from "@/models/metadata";
import ApiService from "./api.service";
import MetadataService from "./metadata.service";

@injectable()
export default class OrderSetupTimeIncrementService {
  private baseResource: string;

  @inject(ApiService) private ApiSvc!: ApiService;

  @inject(MetadataService) private MetadataSvc!: MetadataService;

  constructor() {
    this.baseResource = "api/restaurants";
  }

  public get(id: string): Promise<Array<IOrderSetupTimeIcrement>> {
    return this.ApiSvc.get<Array<IOrderSetupTimeIcrement>>(`${this.baseResource}/${id}/increments`);
  }

  public create(id: string, newOrderSetupTime: IOrderSetupTimeIcrement): Promise<string> {
    return this.ApiSvc.post<string>(`${this.baseResource}/${id}/increments`, newOrderSetupTime);
  }

  public getMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(`${this.baseResource}/increments`);
  }

  public delete(id: string, childID: string): Promise<boolean> {
    try {
      return this.ApiSvc.delete<boolean>(`${this.baseResource}/${id}/increments/${childID}`);
    } catch (error) {
      throw new OnoError("Could Not Delete Restaurant Order Setup Time Incremnets", error);
    }
  }

  public update(
    id: string,
    childID: string,
    newOrderSetupTime: IOrderSetupTimeIcrement
  ): Promise<IOrderSetupTimeIcrement> {
    return this.ApiSvc.put<IOrderSetupTimeIcrement>(
      `${this.baseResource}/${id}/increments/${childID}`,
      newOrderSetupTime
    );
  }
}
