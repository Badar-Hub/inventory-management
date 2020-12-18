<template>
  <q-checkbox v-model="inputValue" v-bind="$attrs" size="xs" class="q-pl-md">
    <template>
      <p class="label-font q-ma-none text-weight-bold">{{ label }}</p>
    </template>
  </q-checkbox>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class OnoCheckbox extends Vue {
  @Prop({ required: true, default: "label" }) label!: string;

  @Prop({ required: true }) value!: Array<string> | number;

  get inputValue() {
    return this.value;
  }

  set inputValue(val) {
    this.$emit("input", val);
  }
}
</script>

<style lang="scss" scoped>
.label-font {
  font-size: $font-medium;
}
</style>
