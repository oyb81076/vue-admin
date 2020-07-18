<template>
<h1>AgentDetail {{id}}</h1>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    id() { return this.$route.params.id; },
  },
});
</script>
