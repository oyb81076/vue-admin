<template>
  <div>
    <h1>AgentCreator</h1>
    <div>{{value}}</div>
    <div>{{db}}</div>
    <button @click="incr">incr</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return { value: 1 };
  },
  computed: {
    db() { return this.$data.value * 1; },
  },
  methods: {
    incr() { this.value += 1; },
  },
});
</script>
