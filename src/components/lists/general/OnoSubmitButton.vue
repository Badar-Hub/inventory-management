<template>
  <q-btn
    :label="$attrs.label ? $attrs.label : `Update`"
    type="submit"
    size="18px"
    color="primary"
    class="q-px-sm font-lato-semi-bold"
    v-bind="$attrs"
  />
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component()
export default class OnoSubmitButton extends Vue {}
</script>

<style></style>
