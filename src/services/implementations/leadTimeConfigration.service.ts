import { inject, injectable } from "inversify";
import { SettingLeadTime, PagedResult, PagedRequest } from "@/models";
import { CollectionMetadata, metadata } from "@/models/metadata";
import ApiService from "./api.service";
import MetadataService from "./metadata.service";

@injectable()
export default class LeadTimeConfigurationsService {
  private baseResource: string;

  @inject(ApiService) private ApiSvc!: ApiService;

  @inject(MetadataService) private MetadataSvc!: MetadataService;

  constructor() {
    this.baseResource = "api/leadTimeConfigurations";
  }

  public get(page: PagedRequest): Promise<PagedResult<SettingLeadTime>> {
    return this.ApiSvc.getPaged(this.baseResource, page);
  }

  public getCollectionMetadata(): Promise<CollectionMetadata> {
    return this.ApiSvc.get<CollectionMetadata>(`${this.baseResource}/$metadata`);
  }

  public getMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(`${this.baseResource}`);
  }
}
