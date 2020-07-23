<template>
  <div :class="{'layout-app':true, collapsed, 'no-aside': asides == null}">
    <header class="layout-topbar">
      <div class="brand">
        <i v-if="collapsed" :class="logo"></i>
        <span v-else v-text="brand"></span>
      </div>
      <div class="links">
        <router-link v-for="x in topbars" :key="x.path" :to="x.path">
          <span v-text="x.title"></span>
        </router-link>
      </div>
      <a href="#" @click.prevent="$emit('logout')">log out</a>
    </header>
    <aside class="layout-aside" v-if="asides">
      <router-link v-for="x in asides" :key="x.path" :to="x.path">
        <i :class="['icon', x.icon]"></i>
        <span v-if="!collapsed" v-text="x.title" />
      </router-link>
      <footer @click="handleCollapse">
        <i v-if="collapsed" class="el-icon-s-unfold"></i>
        <i v-else class="el-icon-s-fold"></i>
      </footer>
    </aside>
    <router-view class="layout-main"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { RouteConfig, RouterOptions } from 'vue-router';
/* eslint-disable @typescript-eslint/no-explicit-any */

export default Vue.extend({
  props: ['brand', 'logo'],
  data() {
    return { collapsed: localStorage.getItem('collapsed') === 'true' };
  },
  components: {
  },
  methods: {
    handleCollapse() {
      this.$data.collapsed = !this.$data.collapsed;
    },
  },
  computed: {
    topbars() {
      const { routes } = (this.$router as any).options as RouterOptions;
      if (!routes) { return null; }
      const root = routes.filter((x) => x.meta && x.meta.title).map((x) => ({
        title: x.meta.title,
        path: x.path,
      }));
      return root;
    },
    asides() {
      const { routes } = (this.$router as any).options as RouterOptions;
      if (!routes) { return null; }
      const rootMatch = this.$route.matched[0];
      if (!rootMatch) { return null; }
      const rootPath = rootMatch.path;
      const route: RouteConfig | undefined = routes.find((x) => x.path === rootPath);
      if (!route) { return null; }
      if (!route.children) { return null; }
      const root = route.children.filter((x) => x.meta && x.meta.title).map((x) => ({
        title: x.meta.title,
        icon: x.meta.icon || 'el-icon-menu',
        path: join(rootPath, x.path),
      }));
      return root;
    },
  },
  watch: {
    collapsed(current) {
      localStorage.setItem('collapsed', String(current));
    },
  },
});
function join(path0: string, path1: string) {
  if (path1.startsWith('/')) { return path1; }
  if (path0.endsWith('/')) { return path0 + path1; }
  return `${path0}/${path1}`;
}
</script>
