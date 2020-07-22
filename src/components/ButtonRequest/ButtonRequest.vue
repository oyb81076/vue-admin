<template>
  <el-button v-if="!link" size="mini" :type="type" @click="handleClick">
    <slot v-if="!loading"></slot>
    <span v-else>loading...</span>
  </el-button>
  <el-link v-else :type="type" @click="handleClick">
    <slot v-if="!loading"></slot>
    <span v-else>loading...</span>
  </el-link>
</template>
<script lang="ts">
import Vue from 'vue';
import { request } from '../../utils/ajax';

export default Vue.extend({
  props: {
    method: { type: String, required: true },
    url: { type: String, required: true },
    query: { type: Object },
    payload: { type: [Object, Array] },
    credentials: { type: Boolean, default: true },
    confirmMessage: String,
    successMessage: { type: String, default: '操作成功!' },
    link: { type: Boolean, default: false },
    type: { type: String, default: 'primary' },
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
          title: '提示',
          type: 'success',
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
