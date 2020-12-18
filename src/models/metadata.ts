export type metadata = { [key: string]: { label?: string; tooltip?: string } };
export default class Metadata {
  metadata: metadata = {};
}

export interface MetadataResult {
  name: string;
  type: string;
}

export interface CollectionMetadata {
  sortable: MetadataResult[];
  filterable: MetadataResult[];
}
