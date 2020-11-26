<template>
  <div>
      <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="$emit('toogle-left-sidebar')"
          aria-label="Menu"
          icon="menu"
        />

        <side-bar/>

        <q-toolbar-title>
          Inventory Management
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component
export default class Header extends Vue{

}
</script>

<style>

</style>