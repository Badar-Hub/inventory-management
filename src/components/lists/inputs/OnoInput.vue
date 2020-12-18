<template>
  <q-input v-model="inputValue" label-slot class="q-mb-lg" dense v-bind="$attrs">
    <template v-slot:label>
      <div class="row items-center all-pointer-events no-wrap">
        <p class="input-label font-lato-semi-bold q-mb-sm">{{ labelContent }}</p>
        <div v-if="tooltipContent" class="q-ml-xs q-mb-sm">
          <q-icon name="info_outlined" />
          <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left">{{
            tooltipContent
          }}</q-tooltip>
        </div>
      </div>
    </template>
    <template v-slot:append>
      <slot name="append"> </slot>
    </template>
  </q-input>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class OnoInput extends Vue {
  @Prop({ required: true }) labelContent!: string;

  @Prop({ required: false }) tooltipContent!: string;

  @Prop({ required: true }) value!: string | number;

  get inputValue() {
    return this.value;
  }

  set inputValue(val) {
    this.$emit("input", val);
  }
}
</script>

<style lang="scss" scoped>
.input-label {
  font-size: $font-tiny;
}
</style>
