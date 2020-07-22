<template>
  <div class="el-page-header page-header">
    <div v-if="back != false" class="el-page-header__left" @click="handleBack">
      <i class="el-icon-back"></i>
      <span class="el-page-header__title">返回</span>
    </div>
    <div class="el-page-header__content" v-text="title"></div>
    <slot></slot>
  </div>
</template>
<style lang="scss">
.page-header {
  display: flex;
  align-items: center;
  .el-page-header__content {
    flex-grow: 1;
  }
}
</style>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    back: {
      type: [Boolean, Function],
      default: true,
    },
    reload: {
      type: Function,
    },
    title: String,
  },
  methods: {
    handleBack() {
      if (typeof this.back === 'function') {
        this.back();
      } else if (this.back) {
        this.$router.back();
      }
    },
  },
});
</script>
