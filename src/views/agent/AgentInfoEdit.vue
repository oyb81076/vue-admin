<template>
  <div>
    <h1>AgentEdit {{id}}</h1>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    id() { return this.$route.params.id; },
  },
});
</script>
