import { metadata } from "@/models/metadata";

export default interface IMetadataService {
  getModelMetadata(resource: string): Promise<metadata>;
}
