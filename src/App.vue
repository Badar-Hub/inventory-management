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

<style>
</style>
