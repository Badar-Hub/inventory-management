<template>
  <div>
    <div v-if="isLoadingMetadata"></div>
    <div v-else>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time v-model="inputValue" :mask="formMetadata.timeMask">
            <div class="row items-center justify-end">
              <q-btn v-close-popup :label="formMetadata.closeBtnLabel" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import OnoMetadataBase from "../base/OnoMetadataBase.vue";

@Component({})
export default class OnoInputTimeExtention extends OnoMetadataBase {
  @Prop({ required: true }) value!: string | number;

  get inputValue() {
    return this.value;
  }

  set inputValue(val) {
    this.$emit("input", val);
  }

  created() {
    this.modelMetadataPath = "api/inputs/time-extension";
    this.initMetadata();
  }
}
</script>

<style></style>
