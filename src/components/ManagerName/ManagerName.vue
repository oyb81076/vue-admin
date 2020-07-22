<template>
  <span v-if="!loader">-</span>
  <span v-else-if="loader.loading">Loading....</span>
  <span v-else-if="loader.error" v-text="loader.error"></span>
  <span v-else-if="!loader.data">用户不存在</span>
  <router-link v-else-if="router" :to="`/manager/detail/${id}`" v-text="loader.data.name" />
  <span v-else v-text="loader.data.name" />
</template>
<script lang="ts">
import Vue from 'vue';
import managerLoader from '@/store/managerLoader';

export default Vue.extend({
  name: 'ManagerName',
  props: {
    id: String,
    router: {
      default: true,
    },
  },
  computed: {
    loader() {
      const { id } = this;
      if (!id || id === '0') { return null; }
      return managerLoader.load(id);
    },
  },
});

</script>
