<template>
  <el-button v-if="!link" v-loading="loading" size="mini" type="danger" @click="handleClick">
    <slot v-if="!loading">删除</slot>
    <span v-else>loading...</span>
  </el-button>
  <el-link v-else type="danger" @click="handleClick">
    <slot v-if="!loading">删除</slot>
    <span v-else>loading...</span>
  </el-link>
</template>
<script lang="ts">
import Vue from 'vue';
import { request } from '../../utils/ajax';

export default Vue.extend({
  props: {
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: 'delete',
    },
    payload: {
      type: [Object, Array],
    },
    credentials: {
      type: Boolean,
      default: true,
    },
    confirmMessage: {
      type: String,
      default: '是否确认删?',
    },
    successMessage: {
      type: String,
      default: '删除成功!',
    },
    link: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { loading: false };
  },
  methods: {
    async handleClick() {
      try {
        const msg = this.confirmMessage;
        const ok = !msg ? true : await this.$confirm(msg).then(() => true, () => false);
        if (!ok) { return; }
        this.loading = true;
        const res = await request(this.method, this.url, this.payload, this.credentials);
        this.loading = false;
        this.$notify({
          showClose: true,
          type: 'success',
          title: '提示',
          message: this.successMessage,
        });
        this.$emit('success', res);
      } catch (e) {
        this.loading = false;
        this.$alert(e.message);
      }
    },
  },
});
</script>
