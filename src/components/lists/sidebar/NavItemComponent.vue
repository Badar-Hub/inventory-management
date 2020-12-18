<template>
  <div>
    <div
      :class="{
        'nav-items-item': true,
        'm-5': showChild,
        extended: isExtended
      }"
    >
      <div v-if="isNavItemInavigable" @click="handleInnvagiableClick" class="item-container">
        <div :class="{ 'nav-items-item-selector': true }"></div>
        <q-icon v-if="!isExtended" class="nav-items-item-icon" :name="itemIcon"></q-icon>
        <p v-if="!collapsed">{{ item.name }}</p>
      </div>
      <router-link
        v-else
        :to="{ name: item.name, params: currentRoute.params }"
        v-slot="{ href, isActive, isExactActive }"
      >
        <a
          :href="href"
          :class="[
            'item-container',
            isNavItemActive(isActive) && 'nav-items-item-active',
            isActive && 'router-link-active',
            isExactActive && 'router-link-exact-active'
          ]"
        >
          <div :class="{ 'nav-items-item-selector': true }"></div>
          <q-icon v-if="!isExtended" class="nav-items-item-icon" :name="itemIcon"></q-icon>
          <p v-if="!collapsed">{{ item.name }}</p>
        </a>
      </router-link>
    </div>
    <div v-if="showChild">
      <div
        v-for="(child, i) in item.children"
        :key="i"
        :class="{ extended: isExtended, 'nav-items-child-item': true }"
      >
        <router-link :to="child.path" v-slot="{ href, isActive }">
          <a
            :href="href"
            :class="[
              'item-container',
              isActive && 'router-link-active',
              isActive && 'router-link-exact-active'
            ]"
          >
            <div class="nav-items-child-item-selector"></div>
            <div v-if="!isExtended" class="nav-items-child-item-icon text-dark">ICON</div>
            <p v-if="!collapsed">{{ child.name }}</p>
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RouteMeta from "@/view-models/sidebar/routeMeta";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Route, RouteConfig } from "vue-router";

@Component({})
export default class NavItemComponent extends Vue {
  private isActive: boolean = false;

  @Prop({ required: false, default: false }) collapsed!: boolean;

  @Prop({ required: true }) item!: RouteConfig;

  @Prop({ required: false }) isExtended!: RouteConfig;

  get itemIcon() {
    const hasMeta = typeof this.item.meta !== "undefined";
    let icon = "";
    if (hasMeta) {
      if (this.isActive && this.item.meta.activeIcon) {
        icon = this.item.meta.activeIcon;
      } else icon = this.item.meta.icon;
    }
    return icon;
  }

  get isNavItemInavigable() {
    return this.item.meta && this.item.meta.isInavigable;
  }

  get showChild() {
    return (
      !(this.item.meta as RouteMeta)?.extended &&
      !!this.currentRoute.matched.find(x =>
        x.path === "" ? this.item.path === "/" : this.isStringEndsWith(x.path, this.item.path)
      ) &&
      this.item.children?.length
    );
  }

  private matchWith = "";

  get currentRoute(): Route {
    return this.$route;
  }

  private toMatch = "";

  handleInnvagiableClick() {
    if (this.item.meta) {
      this.isActive = this.item.meta.onClick();
    }
  }

  isStringEndsWith(matchWith: string, toMatch: string): boolean {
    this.matchWith = matchWith;
    this.toMatch = toMatch;

    const expectedEnd = matchWith.substring(matchWith.length - toMatch.length);
    return expectedEnd === toMatch;
  }

  isNavItemActive(isActive: boolean) {
    const IsActive =
      !!this.$router.currentRoute.matched.find(x =>
        x.path === "" ? this.item.path === "/" : x.path === this.item.path
      ) || isActive;

    this.isActive = (this.item.path === "/"
      ? IsActive && this.showChild
      : IsActive || this.showChild) as boolean;
    return this.isActive;
  }
}
</script>

<style lang="scss" scoped>
.nav-items {
  &-item {
    &.extended {
      padding: 0;
      margin-bottom: 4px;
      a {
        font-size: $font-regular;
        font-weight: 350;
        color: $text-secondary;
        text-decoration: none;
        display: flex;
        width: 100%;
        p {
          margin: auto 0;
          margin-left: 12px;
        }
        .nav-items-item-selector {
          background-color: $black;
        }
      }
      &-icon {
        width: 1.5rem;
        height: 1.5rem;
      }
      &-active {
        color: $text-primary !important;

        a {
          p {
            font-weight: 400 !important;
          }
        }
        .nav-items-item-selector {
          background-color: $accent !important;
        }
      }
    }
    &-active {
      color: $text-primary !important;
      .nav-items-item-icon {
        opacity: 1 !important;
      }

      .nav-items-item-selector {
        background-color: $accent !important;
      }
    }
    &-selector {
      margin-right: 10px;
      width: 3px;
      background-color: $secondary;
    }
    &-icon {
      width: 30px;
      height: 30px;
      opacity: 0.6;
    }
    display: flex;
    padding: 0 10px;
    margin-bottom: 24.4px;
    height: 30px;
    width: 100%;
    .item-container {
      cursor: pointer;
      font-size: 1rem;
      color: $text-secondary;
      text-decoration: none;
      display: flex;
      width: 100%;
      p {
        margin-bottom: 8px;
        margin-left: 10px;
      }
    }
  }
}

.nav-items-child {
  &-item {
    &.extended {
      a {
        &.router-link-exact-active {
          color: $text-primary;
          background-color: $black !important;
        }
      }
    }
    &-selector {
      margin-right: 10px;
      width: 3px;
      z-index: -1 !important;
    }
    &-icon {
      z-index: -1 !important;
    }
    display: flex;
    padding: 0 10px 0 22px;
    margin-bottom: 10px;
    height: 35px;
    width: 100%;
    a {
      font-size: $font-medium;
      font-weight: 450;
      color: $text-secondary;
      text-decoration: none;
      display: flex;
      width: 100%;
      &.router-link-exact-active {
        color: $text-primary;
        background-color: $dark;
        border-radius: 5px;
      }
      p {
        margin: auto 0;
        margin-left: 9px;
      }
    }
  }
}
</style>
