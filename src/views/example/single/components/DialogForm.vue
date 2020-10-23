<template>
  <el-dialog
    title="收货地址"
    :visible.sync="visible"
    @closed="$emit('closed')"
  >
    <el-form :model="state" label-width="120px">
      <el-form-item label="活动名称">
        <el-input v-model="state.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="state.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import { cloneDeep } from 'lodash';

export default Vue.extend({
  props: ['formValue'],
  data() {
    return {
      visible: true,
      state: cloneDeep(this.formValue),
    };
  },
});
</script>
