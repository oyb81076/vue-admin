<template>
  <div>
    <el-page-header @back="$router.back()" content="Example Data Edit" />
    <h1>ID: {{id}}</h1>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

/**
 * Vue.extends({
 *   mixins: [formMixins],
 *   props: ['id'],
 *   detail: {
 *     url(){ return '/api/example/' + this.id },
 *   },
 *   form: {
 *     url(){ return '/api/example/' + this.id },
 *     method: 'put',
 *     rules: {},
 *     ref: 'form',
 *     message: '保存成功',
 *   },
 *   data(){ return { state: {} } }
 * })
 * <el-form :model="state" :rules="$form.rules" ref="$form.ref">
 *   <el-button @click="$form.submit" v-loading="$form.loading">保存</el-button>
 */
export default Vue.extend({
  props: ['id'],
});
</script>
