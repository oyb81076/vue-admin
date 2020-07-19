<template>
  <article class="main">
    <el-menu
      class="main-aside"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="activeIndex"
      @select="handleSelect"
      >
      <el-menu-item index="/example/data">
        <span slot="title">info</span>
      </el-menu-item>
      <el-menu-item index="/example/single">
        <span slot="title">rank</span>
      </el-menu-item>
    </el-menu>
    <div class="main-view">
      <router-view />
    </div>
  </article>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    activeIndex() { return this.$route.path.split('/').slice(0, 3).join('/'); },
  },
  methods: {
    handleSelect(index: string) {
      if (index === this.activeIndex) { return; }
      this.$router.push(index);
    },
  },
});
</script>
