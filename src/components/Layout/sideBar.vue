<template>
  <div>
      <q-drawer
      v-model="active"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
    <div class="logo-container q-my-lg">
        <img class="logo" src="@/assets/logo/logo.png" />
    </div>
    <div class="q-mt-lg">
        <q-list v-for="(navitem, index) in navItems" :key="index" v-on="navitem">
            <q-item clickable tag="a" :href="`/#${navitem.path}`">
            <q-item-section avatar>
                <q-icon name="school" />
            </q-item-section>
            <q-item-section>
                <q-item-label>{{ navitem.name }}</q-item-label>
            </q-item-section>
            </q-item>
        </q-list>
    </div>
    </q-drawer>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class SideBar extends Vue {
    @Prop({default: false}) active!: boolean

    get navItems(){
        console.log(this.$router.options.routes);
       return this.$router.options.routes
       
    }
}
</script>

<style lang="scss">
.logo-container {
    text-align: center;
}
.logo {
    max-width: 100px;
}

</style>