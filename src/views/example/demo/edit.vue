<template>
  <div v-loading="getter.state.loading || editor.state.loading">
    <el-page-header @back="$router.back()" content="Example Data Edit" />
    <example-form v-if="getter.state.data" :form-value="getter.state.data" @submit="handleSubmit" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import useGet from '@/utils/useGet';
import useSubmit from '@/utils/useSubmit';
import { Example } from '@/models/example';
import ExampleForm from './components/ExampleForm.vue';
import { asyncAlert, asyncError } from '../../../utils/async';

export default Vue.extend({
  components: { ExampleForm },
  props: ['id'],
  computed: {
    getter() {
      return useGet(`/api/example/${this.id}`);
    },
    editor() {
      return useSubmit('put', `/api/example/${this.id}`);
    },
  },
  methods: {
    handleSubmit(value: Example) {
      this.editor.submit(value)
        .then(() => asyncAlert('保存成功'))
        .then(() => this.$router.back())
        .catch(asyncError);
    },
  },
  watch: {
    'getter.state': function fn(next) {
      if (!next.loading && next.error) {
        asyncError(next.error);
      }
    },
  },
});
</script>
