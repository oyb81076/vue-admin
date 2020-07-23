<template>
  <div v-loading="getter.state.loading || editor.state.loading">
    <el-page-header @back="$router.back()" content="Example Data Edit" />
    <example-form v-if="getter.state.data" :form-value="getter.state.data" @submit="handleSubmit" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import useGetJSON from '@/utils/useGetJSON';
import useSubmit from '@/utils/useSubmit';
import { Example } from '@/models/example';
import ExampleForm from './components/ExampleForm.vue';

export default Vue.extend({
  components: { ExampleForm },
  props: ['id'],
  computed: {
    getter() {
      return useGetJSON();
    },
    editor() {
      return useSubmit('put', `/api/example/${this.id}`);
    },
  },
  methods: {
    async handleSubmit(value: Example) {
      try {
        await this.editor.submit(value);
        await this.$alert('保存成功');
        this.$router.back();
      } catch (err) {
        this.$alert(err.message);
      }
    },
  },
  watch: {
    id: {
      handler(id: string) { this.getter.request(`/api/example/${id}`); },
      immediate: true,
    },
  },
});
</script>
