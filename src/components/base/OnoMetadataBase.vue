<script lang="ts">
import { metadata } from "@/models";
import { MetadataService } from "@/services/implementations";
import OnoBase from "./Base.vue";

export default class OnoMetadataBase extends OnoBase {
  public isLoadingMetadata: boolean = true;

  public metadataService!: MetadataService;

  public formMetadata!: metadata;

  public modelMetadataPath: string = "";

  initMetadata() {
    this.metadataService = this.container.get(MetadataService);
    this.metadataService.getModelMetadata(this.modelMetadataPath).then(data => {
      this.formMetadata = data;
      this.isLoadingMetadata = false;
    });
  }
}
</script>
