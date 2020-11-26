<template>
  <q-layout view="lHh Lpr lFf">
    <Header @toogle-left-sidebar="left = !left"/>
    <SideBar :active="left"/>
    <q-page-container>

    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Header from './components/Layout/header.vue'
import SideBar from './components/Layout/sideBar.vue'

@Component({
  components:{
    Header,
    SideBar
  }
})

export default class App extends Vue{
  left: boolean = true
}
</script>

<style lang="scss">
body{
}
.font-size {
  font-size: 8px;
  &-medium{
    font-size: 14px;
  }
  &-large{
    font-size: 20px;
  }
}
.font{
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: 300;
  &-medium{
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 500;
  }
  &-semi-bold{
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 700;
  }
  &-medium{
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 900;
  }
}
</style>
