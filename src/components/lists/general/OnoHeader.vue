<template>
  <div>
    <div v-if="isLoadingMetadata" class="q-my-md">
      <q-skeleton :height="`${$q.screen.height - 100}px`" />
    </div>
    <div v-else>
      <div :class="{ head: true, 'head-secondary': showSecondary }" @click="onHeaderClick">
        <p class="font-rubik-semi-bold text-h4 q-mb-none">{{ title }}</p>
        <div class="row" v-if="showBadge">
          <div class="q-my-auto q-ml-sm">
            <OnoBadge v-if="!showSecondary" :badge="onoBadge" />
          </div>
        </div>
        <div class="row" :class="{ 'q-ml-auto': showBadge }">
          <div class="q-my-auto q-ml-sm" v-if="!showSecondary">
            <q-icon @click="iconClicked" size="lg" class="q-pl-md q-pt-xs" name="ono-activity" />
            <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left">{{
              formMetadata.activityLog.tooltip
            }}</q-tooltip>
          </div>
        </div>
        <div class="q-my-auto q-ml-sm" v-if="showSecondary">
          <q-icon name="filter_list" />
          <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left">{{
            formMetadata.expandBtn.label
          }}</q-tooltip>
        </div>
        <div class="q-my-auto q-ml-sm" v-if="buttonText">
          <q-btn size="md" :label="buttonText" color="primary" class="q-px-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import OnoBadge from "@/components/general/OnoBadge.vue";
import OnoBadgeModel from "@/view-models/general/onoBadgeModel";
import { Component, Prop } from "vue-property-decorator";
import OnoMetadataBase from "../base/OnoMetadataBase.vue";

@Component({
  components: {
    OnoBadge
  }
})
export default class OnoHeader extends OnoMetadataBase {
  @Prop({ default: "" }) title!: string;

  @Prop({ required: false }) onoBadge?: OnoBadgeModel;

  @Prop({ required: false, default: false }) showBadge?: boolean;

  @Prop({ required: false, default: "" }) buttonText?: boolean;

  get showSecondary() {
    return this.$q.screen.lt.md;
  }

  iconClicked() {
    this.$emit("icon-clicked");
  }

  onHeaderClick() {
    if (this.showSecondary) {
      this.$store.commit("toggleSecondaryNav");
    }
  }

  mounted() {
    this.modelMetadataPath = "api/general/header";
    this.initMetadata();
  }
}
</script>

<style lang="scss">
.head-secondary {
  cursor: pointer;
  display: flex;
  margin: -$container-padding !important;
  margin-bottom: 21px !important;
  padding: 5px 15px;
  p {
    font-size: medium;
    font-weight: 500 !important;
  }
  background-color: $secondary;
  color: $text-primary;

  i {
    font-size: 25px;
  }
}

.head {
  display: flex;
  margin-bottom: 21px;
  p {
    font-weight: 900;
  }
}
</style>
