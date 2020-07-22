<template>
  <div>
    <el-page-header @back="$router.back()" content="Example Data Edit" />
    <h1>ID: {{id}}</h1>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['id'],
});
</script>
