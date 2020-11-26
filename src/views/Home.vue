<template>
  <div class="home">
    <side-bar/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import sideBar from '@/components/Layout/sideBar.vue'; 

@Component({
  components: {
    sideBar,
  },
})
export default class Home extends Vue {
  leftDrawerOpen: boolean = false
}
</script>
