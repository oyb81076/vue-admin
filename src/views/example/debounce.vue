<template>
  <div>
    <el-page-header @back="$router.back()" content="Example Debounce"></el-page-header>
    <div>query.value: {{$route.query.value}}</div>
    <div>data.value: {{value}}</div>
    <input type="text" v-model="value" @keypress.enter="handleChange">
    <button @click="handleChange">Submit</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import debounce from 'lodash.debounce';

export default Vue.extend({
  data() {
    return { value: String(this.$route.query.name || '') };
  },
  methods: {
    handleChange() {
      this.debounceChange.cancel();
      if (this.value !== this.$route.query.value) {
        this.$router.push({ query: { value: this.value } });
      }
    },
  },
  beforeDestroy() {
    this.debounceChange.cancel();
  },
  computed: {
    debounceChange() {
      return debounce(() => this.handleChange(), 1000);
    },
  },
  watch: {
    value() {
      this.debounceChange();
    },
  },
});
</script>
