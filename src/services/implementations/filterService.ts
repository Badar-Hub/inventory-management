import { injectable, inject } from "inversify";

import { metadata } from "@/models";
import MetadataService from "./metadata.service";

@injectable()
export default class FilterService {
  private baseResource: string;

  @inject(MetadataService) private MetadataSvc!: MetadataService;

  constructor() {
    this.baseResource = "api/list";
  }

  public getMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(`${this.baseResource}/filter`);
  }
}
