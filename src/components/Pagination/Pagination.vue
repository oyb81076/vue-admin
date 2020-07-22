<template>
  <el-pagination
    v-if="page.total != null"
    background
    layout="prev, pager, next"
    :page-size="page.size"
    :current-page="page.current"
    :total="page.total"
    :pager-count="11"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>
<script lang="ts">
import Vue from 'vue';
import { injectURLQuery } from '@/utils/urls';

export default Vue.extend({
  props: {
    page: Object,
    replace: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCurrentChange(index: number) {
      const query = {
        ...this.$route.query,
        total: this.page.total,
        index: index - 1,
      };
      const url = injectURLQuery('', query);
      console.log(JSON.stringify(this.replace));
      if (this.replace) {
        this.$router.replace(url);
      } else {
        this.$router.push(url);
      }
    },
  },
});
</script>
