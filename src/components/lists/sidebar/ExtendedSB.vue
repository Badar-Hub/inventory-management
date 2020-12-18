<template>
  <div class="container">
    <q-infinite-scroll class="text-white">
      <div class="nav">
        <div class="nav-extended-items" v-for="(item, i) in navItem" :key="i">
          <NavItemComponent :item="item" :isExtended="true" />
        </div>
      </div>
    </q-infinite-scroll>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import NavItemComponent from "./NavItemComponent.vue";

@Component({
  components: {
    NavItemComponent
  }
})
export default class ExtendedSB extends Vue {
  @Prop() navItem?: RouteConfig;
}
</script>

<style lang="scss" scoped>
.nav {
  padding: 0;
  margin: 0;
  margin-top: 18px;
}
.container {
  background-color: $black;
  width: 195px;
  display: inline-block;
}
</style>
