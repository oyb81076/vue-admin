<template>
  <div v-loading="creator.state.loading">
    <el-page-header @back="$router.back()" content="Example Create" />
    <example-form @submit="handleSubmit" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Example } from '@/models/example';
import useSubmit from '@/utils/useSubmit';
import ExampleForm from './components/ExampleForm.vue';
import { asyncError, asyncAlert } from '../../../utils/async';

export default Vue.extend({
  components: { ExampleForm },
  computed: {
    creator() {
      return useSubmit<Example>('post', '/api/example');
    },
  },
  methods: {
    handleSubmit(value: Example) {
      this.creator.submit(value)
        .then(() => asyncAlert('保存成功'))
        .then(() => this.$router.back())
        .catch(asyncError);
    },
  },
});
</script>
