<template>
  <q-dialog :value="value" @input="$emit('input', $event)">
    <q-card class="q-pa-xs q-pb-md">
      <q-card-section>
        <div class="text-h5 q-pt-none text-weight-bolder">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-weight-bold">
        {{ content }}
      </q-card-section>

      <q-card-actions align="left" class="q-pl-sm">
        <q-btn
          padding="8px 20px"
          class="q-mr-xs"
          no-caps
          outline
          label="Cancel"
          color="black"
          v-close-popup
          @click="handleCancel"
        />
        <q-btn
          :loading="primaryLoading"
          padding="8px 30px"
          no-caps
          :label="primaryLabel"
          :color="primaryColor"
          @click="$emit('primary-action')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class OnoConfirmationDialog extends Vue {
  @Prop() value!: boolean;

  @Prop() primaryLoading!: boolean;

  @Prop() title!: string;

  @Prop() content!: string;

  @Prop() primaryLabel!: string;

  @Prop() primaryColor!: string;

  handleCancel() {
    this.$emit("input", !this.value);
    this.$emit("cancel");
  }
}
</script>
