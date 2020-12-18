<template>
  <q-select
    v-model="inputValue"
    label-slot
    :class="[mainClass]"
    dense
    map-options
    emit-value
    options-dense
    :options="options"
    v-bind="$attrs"
    class="font-lato-bold"
  >
    <template v-slot:label>
      <div class="row items-center all-pointer-events no-wrap">
        <p :class="[labelClass]" class="input-label font-lato-semi-bold">
          {{ labelContent }}
        </p>

        <div v-if="tooltipContent" class="q-ml-xs q-mb-sm">
          <q-icon name="info_outlined" />
          <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]"
            >{{ tooltipContent }}
          </q-tooltip>
        </div>
      </div>
    </template>
    <template v-slot:before-options v-if="multiSelect">
      <q-item clickable class="q-px-xs" @click="selectAll(!IsSelectAll)">
        <q-item-section side class="q-pa-none">
          <q-checkbox
            size="xs"
            :value="IsSelectAll"
            @input="selectAll"
            :val="inputValue"
            class="font-lato-semi-bold"
          ></q-checkbox>
        </q-item-section>
        <q-item-section>
          <q-item-label>Select All</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" class="q-px-xs">
        <q-item-section side class="q-pa-none" v-if="multiSelect">
          <q-checkbox size="xs" v-model="inputValue" :val="getOptionValue(scope.opt)" />
        </q-item-section>
        <q-item-section>
          <q-item-label
            class="font-lato-semi-bold"
            v-html="getOptionLabel(scope.opt)"
          ></q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { QCheckbox } from "quasar";
import SelectOption from "@/view-models/general/select/selectOption";

@Component({
  components: {
    QCheckbox
  }
})
export default class OnoSelect extends Vue {
  @Prop({ required: false, default: "q-mb-lg" }) mainClass!: string;

  @Prop({ required: false, default: "text-weight-bold q-mb-sm" }) labelClass!: string;

  @Prop({ required: true }) labelContent!: string;

  @Prop({ required: false }) tooltipContent!: string;

  @Prop({ required: true }) value!: string | number;

  @Prop({ required: false, default: false }) multiSelect?: boolean;

  @Prop({ required: true, default: [] }) options?: SelectOption[];

  IsSelectAll: boolean = false;

  selectAll(val: any) {
    this.IsSelectAll = val;

    if (this.IsSelectAll)
      this.$emit(
        "input",
        this.options!.map(opt => this.getOptionValue(opt))
      );
    else this.$emit("input", []);
  }

  get inputValue() {
    return this.value;
  }

  @Watch("inputValue")
  onInputValue(value: any) {
    this.IsSelectAll = value?.length === this.options!.length;
  }

  set inputValue(val) {
    this.$emit("input", val);
  }

  getOptionLabel(option: SelectOption): string {
    let label = "";
    if (typeof option === "string") label = option;
    else label = option.label;

    return label;
  }

  getOptionValue(option: SelectOption) {
    let value = "";
    if (typeof option === "string") value = option;
    else value = option.value;

    return value;
  }
}
</script>

<style lang="scss" scoped>
.input-label {
  font-size: $font-tiny;
  font-weight: 700 !important;
}
</style>
