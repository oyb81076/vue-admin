<template>
  <article>
    <el-menu
      class="main-aside"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="activeIndex"
      @select="handleSelect"
      >
      <el-menu-item index="/example/data">
        <span slot="title">分页</span>
      </el-menu-item>
      <el-menu-item index="/example/single">
        <span slot="title">单页</span>
      </el-menu-item>
    </el-menu>
    <router-view class="main-view"/>
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
