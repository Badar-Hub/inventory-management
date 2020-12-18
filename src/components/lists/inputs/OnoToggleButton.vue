<template>
  <div>
    <div v-if="isLoadingMetadata"></div>
    <div v-else>
      <q-toggle v-model="inputValue" color="accent" v-bind="$attrs" left-label>
        <template>
          <p class="label-font q-ma-none text-weight-medium">
            {{ toggleLabel }}
          </p>
        </template>
      </q-toggle>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import OnoMetadataBase from "../base/OnoMetadataBase.vue";

@Component
export default class OnoCheckbox extends OnoMetadataBase {
  @Prop({ required: true }) value!: string | number;

  get inputValue() {
    return this.value;
  }

  set inputValue(val) {
    this.$emit("input", val);
  }

  get toggleLabel() {
    return this.inputValue ? this.formMetadata.positive.label : this.formMetadata.negative.label;
  }

  created() {
    this.modelMetadataPath = "api/inputs/toggle";
    this.initMetadata();
  }
}
</script>

<style lang="scss" scoped>
.label-font {
  font-size: $font-medium;
}
</style>
