<template>
  <div>
    <el-page-header @back="$router.back()" content="Example Detail" />
    <pre>ID      :{{id}}</pre>
    <pre>Loading :{{getter.state.loading}}</pre>
    <pre>Error   :{{getter.state.error}}</pre>
    <pre>Data    :{{getter.state.data}}</pre>
    <button @click.prevent="getter.reload">Reload</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import useGet from '@/utils/useGet';

export default Vue.extend({
  props: ['id'],
  computed: {
    getter() { return useGet(`/api/example/${this.id}`); },
  },
});
</script>
