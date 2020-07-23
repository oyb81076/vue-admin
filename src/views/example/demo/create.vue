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

export default Vue.extend({
  components: { ExampleForm },
  computed: {
    creator() {
      return useSubmit<Example>('post', '/api/example');
    },
  },
  methods: {
    async handleSubmit(value: Example) {
      try {
        await this.creator.submit(value);
        await this.$alert('保存成功');
        this.$router.back();
      } catch (err) {
        this.$alert(err.message);
      }
    },
  },
});
</script>
