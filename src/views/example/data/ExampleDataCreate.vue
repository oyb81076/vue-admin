<template>
  <div>
    <el-page-header @back="$router.back()" content="Example Create" />
    <el-form
      :model="state"
      :rules="rules"
      @submit.native.prevent
      ref="form"
      label-width="150px"
      style="max-width: 800px"
    >
      <el-form-item label="select" prop="type">
        <el-select v-model="state.type" placeholder="请选择活动区域">
          <el-option v-for="x in typeNames" :key="x[0]" :label="x[1]" :value="x[0]" />
        </el-select>
      </el-form-item>
      <el-form-item label="options" prop="type">
        <el-radio-group v-model="state.type">
          <el-radio v-for="x in typeNames" :key="x[0]" :label="x[0]" >{{x[1]}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="options" prop="type">
        <el-radio-group v-model="state.type" size="medium">
          <el-radio-button v-for="x in typeNames" :key="x[0]" :label="x[0]">
            {{x[1]}}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="禁用" prop="disabled">
        <el-switch v-model="state.disabled" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="state.name" />
      </el-form-item>
      <el-form-item label="date" prop="created">
        <el-date-picker v-model="state.created" type="date" placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="datetime" prop="created">
        <el-date-picker v-model="state.created" type="datetime" placeholder="选择日期" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {
  Example, ExampleType, createRules, exampleTypeNames,
} from '@/models/example';

/**
 * Vue.extends({
 *   mixins: [createMixins],
 *   create: {
 *     url: '/api/example',
 *     rules: {},
 *     ref: 'form',
 *     message: '保存成功',
 *     success(resp){ this.$router.replace('detail/'+resp.id) }
 *   },
 * })
 * <el-form :model="state" :rules="$create.rules" ref="$create.ref" >
 *   <el-button @click="$create.submit" v-loading="$create.submitting">保存</el-button>
 */
export default Vue.extend({
  data() {
    return {
      typeNames: Object.entries(exampleTypeNames),
      state: {
        id: '0',
        type: ExampleType.PUBLIC,
        name: '',
        managerId: '0',
        created: '',
        price: 0,
        quantity: 0,
        disabled: false,
      } as Example,
      rules: createRules(),
    };
  },
  methods: {
    handleSubmit() {
      const vm = this.$refs.form as any;
      vm.validate((valid: unknown) => {
        console.log(`submit${valid}`);
      });
    },
  },
});
</script>
