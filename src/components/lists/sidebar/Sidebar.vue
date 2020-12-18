<template>
  <div>
    <q-drawer
      show-if-above
      v-model="active"
      side="left"
      :width="width"
      behavior="desktop"
      bordered
      content-class="bg-secondary"
    >
      <div class="sidebar">
        <div class="sidebar-main">
          <div class="logo-container bg-secondary text-white">
            <div class="logo">
              <img v-if="!isCollapsed" src="@/assets/onosysLogo.svg" height="35px" alt />
              <img v-else class="q-pl-md" src="@/assets/mobile-logo.svg" height="35px" alt />
            </div>
            <hr />
          </div>
          <q-infinite-scroll class="bg-secondary text-white">
            <div class="nav">
              <div class="nav-items" v-for="(item, i) in navItems" :key="i">
                <NavItemComponent :item="item" :collapsed="isCollapsed" />
              </div>
            </div>
          </q-infinite-scroll>
        </div>
        <ExtendedSB v-if="showExtended" :nav-item="extendedItemChildren" />
      </div>
    </q-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import RouteMeta from "@/view-models/sidebar/routeMeta";
import ExtendedSB from "./ExtendedSB.vue";
import NavItemComponent from "./NavItemComponent.vue";

@Component({
  components: {
    NavItemComponent,
    ExtendedSB
  }
})
export default class Sidebar extends Vue {
  private isCollapsed: boolean = false;

  @Prop({ default: false }) active!: boolean;

  get navItems(): RouteConfig[] | undefined {
    const navItems = this.$router!.options!.routes!;
    navItems.push({
      path: "undefined",
      name: "Collapse",
      meta: {
        isInavigable: true,
        icon: "ono-collapse",
        activeIcon: "ono-anticollapsed",
        onClick: this.collapseSidebar
      }
    });
    return this.filterHidden(navItems);
  }

  collapseSidebar() {
    this.isCollapsed = !this.isCollapsed;
    return this.isCollapsed;
  }

  get extendedItem(): any {
    let result;
    this.$route.matched.forEach(x => {
      const { meta } = x;
      if (meta.extended === undefined) {
        return;
      }

      if (meta.extended) {
        result = x;
      } else {
        // if a child route sets extended to false, flip back to having the extended sidebar closed.
        result = undefined;
      }
    });
    return result;
  }

  get extendedItemChildren() {
    return this.filterHidden(this.getChildrenByPath(this.extendedItem?.path!, this.navItems!));
  }

  get showExtended() {
    return !this.isCollapsed && !!this.extendedItem && this.$route.matched.length > 1;
  }

  get width() {
    let result = 270;
    if (this.isCollapsed) {
      result = 120;
    } else {
      result = this.showExtended ? 270 + 195 : 270;
    }
    return result;
  }

  getChildrenByPath(path: string, children: RouteConfig[]) {
    if (!path) {
      return children;
    }
    const chunks = path.split("/");

    if (!chunks.length) {
      return children;
    }

    chunks.forEach(chunk => {
      if (!children) {
        return;
      }

      const found = children.find(child => child.path.includes(chunk));
      if (found && found.children) {
        children = found.children!;
      }
    });
    return children;
  }

  filterHidden(unfiltered: RouteConfig[]): RouteConfig[] {
    return unfiltered.filter(routeConfig => {
      const tmpMeta: RouteMeta = routeConfig.meta;
      if (tmpMeta?.hidden === undefined) {
        return true;
      }
      return !tmpMeta?.hidden;
    });
  }
}
</script>

<style lang="scss">
.sidebar {
  display: flex;
  width: 100%;
  height: 100%;

  &-main {
    flex: 1;
    height: fit-content;

    .logo-container {
      height: 60px;
      display: flex;
      flex-direction: column;
      .logo {
        object-fit: fill;
        text-align: center;

        margin-top: auto;
      }
      p {
        margin: auto;
        font-size: 25px;
      }
      hr {
        margin: 0 20px;
        margin-top: auto;
        background-color: $text-secondary;
        border: none;
        height: 1px;
      }
    }
    .nav {
      flex-grow: 1;
      padding: 30px 0 0 30px;
    }
  }
}
</style>
