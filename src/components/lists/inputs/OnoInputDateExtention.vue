<template>
  <div>
    <div v-if="isLoadingMetadata"></div>
    <div v-else>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="inputValue" :mask="formMetadata.dateMask">
            <div class="row items-center justify-end">
              <q-btn v-close-popup :label="formMetadata.closeBtnLabel" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import OnoMetadataBase from "../base/OnoMetadataBase.vue";

@Component
export default class OnoInputDateExtention extends OnoMetadataBase {
  @Prop({ required: true }) value!: string | number;

  mounted() {
    this.modelMetadataPath = "api/inputs/date-extension";
    this.initMetadata();
  }

  get inputValue() {
    return this.value;
  }

  set inputValue(val) {
    this.$emit("input", val);
  }
}
</script>

<style></style>
