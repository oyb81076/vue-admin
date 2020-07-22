<template>
  <div class="NotFound">
    <h1>Page Not Found</h1>
    <h2>url: {{url}}</h2>
  </div>
</template>
<style lang="scss" scoped>
  .NotFound {
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
</style>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    url() {
      return this.$route.path;
    },
  },
});
</script>
