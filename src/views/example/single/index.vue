<template>
  <div>
    <el-page-header @back="$router.back()" content="Example Single" />
    <el-button @click="create">创建</el-button>
    <el-table :data="array">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Region" prop="region" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary" @click="formValue = scope.row">详情</el-link>
        </template>
      </el-table-column>
    </el-table>
    <dialog-form
      v-if="formValue != null"
      :form-value="formValue"
      @closed="formValue = null"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import DialogForm from './components/DialogForm.vue';

interface FormValue {
  id: string;
  name: string;
  region: string;
}
export default Vue.extend({
  components: { DialogForm },
  data() {
    return {
      formValue: null as FormValue | null,
      array: Array(10).fill(0).map((_, id): FormValue => ({
        id: String(id + 1), name: `name${id}`, region: 'shanghai',
      })),
    };
  },
  methods: {
    create() {
      this.formValue = {
        id: '0',
        name: '',
        region: '',
      };
    },
  },
});
</script>
