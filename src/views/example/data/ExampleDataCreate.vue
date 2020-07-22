<template>
  <div>
    <el-page-header @back="$router.back()" content="Example Create" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';

export default Vue.extend({
  mixins: [validationMixin],
  validations: {
  },
});
</script>
