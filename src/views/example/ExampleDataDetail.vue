<template>
  <div>
    <h1>Example Data Detail</h1>
    <pre>ID      :{{id}}</pre>
    <pre>Loading :{{getter.state.loading}}</pre>
    <pre>Error   :{{getter.state.error}}</pre>
    <pre>Data    :{{getter.state.data}}</pre>
    <button @click.prevent="getter.reload">Reload</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import useGetJSON from '@/utils/useGetJSON';

export default Vue.extend({
  props: ['id'],
  data() {
    return { getter: useGetJSON() };
  },
  watch: {
    id: {
      immediate: true,
      handler(id: string) { this.getter.request(`/api/agent/${id}`); },
    },
  },
});
</script>
