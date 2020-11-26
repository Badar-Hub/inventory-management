import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
    meta: {
      icon: "dashboard"
    }
  },
  {
    path: '/sales',
    name: 'Sales',
    component: () => import('../views/Sales.vue'),
    meta: {
      icon: "sales"
    }
  },
  {
    path: "/purchases",
    name: "Purchases",
    component: () => import('../views/Purchases.vue'),
    meta: {
      icon: "purchases"
    }
  },
  {
    path: "/pos",
    name: "Pos",
    component: () => import('../views/Pos.vue'),
    meta: {
      icon: "pos"
    }
  },
  {
    path: "/accounts",
    name: "Accounts",
    component: () => import('../views/Accounts.vue'),
    meta: {
      icon: "accounts"
    }
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: () => import('../views/Inventory.vue'),
    meta: {
      icon: "inventory"
    }
  },
  {
    path: "/manufacturing",
    name: "Manufacturing",
    component: () => import('../views/Manufacturing.vue'),
    meta: {
      icon: "manufacturing"
    }
  },
  {
    path: "/reports",
    name: "Reports",
    component: () => import('../views/Reports.vue'),
    meta: {
      icon: "reports"
    }
  },
  {
    path: "/referandearn",
    name: "Refer & Earn",
    component: () => import('../views/Refer&Earn.vue'),
    meta: {
      icon: "referearn"
    }
  },

]

const router = new VueRouter({
  routes
})

export default router
