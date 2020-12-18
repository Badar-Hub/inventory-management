<template>
  <q-btn
    v-if="badge"
    no-caps
    unelevated
    rounded
    padding="1px 13px"
    class="no-shadow text-weight-regular"
    size="14px"
    text-color="black"
    :ripple="false"
    v-bind="$attrs"
    :color="badge.color"
    :label="badge.label"
  />
</template>

<script lang="ts">
import OnoBadgeModel from "@/view-models/general/onoBadgeModel";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class OnoBagde extends Vue {
  @Prop() badge!: OnoBadgeModel;
}
</script>

<style></style>
