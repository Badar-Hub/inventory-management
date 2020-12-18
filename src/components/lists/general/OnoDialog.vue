<template>
  <q-dialog v-model="inputValue">
    <q-card :style="`width:100%; max-width: ${width}`">
      <div class="row items-center q-pa-sm">
        <div class="text-h5 font-rubik-semi-bold">{{ headerText }}</div>
        <q-space />
        <q-btn icon="close" size="lg" flat round dense v-close-popup />
      </div>
      <slot> </slot>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OnoInput from "@/components/inputs/OnoInput.vue";

@Component({
  components: {
    OnoInput
  }
})
export default class OnoDialog extends Vue {
  @Prop({ required: true, default: false }) value!: boolean;

  @Prop({ required: false, default: "Close" }) headerText!: string;

  @Prop({ required: false, default: "400px" }) width!: string;

  get inputValue() {
    return this.value;
  }

  set inputValue(val) {
    this.$emit("input", val);
  }
}
</script>
