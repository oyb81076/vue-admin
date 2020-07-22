<template>
  <div v-loading="$page.loading">
    <el-page-header @back="$router.back()" content="分页Example" />
    <div style="display: flex">
      <el-button @click="$page.reload">刷新</el-button>
      <el-button @click="$router.push('create')">创建</el-button>
      <div style="flex-grow: 1" />
      <form @submit="handleSearch">
        <el-input style="width: 200px" v-model="keywords" placeholder="请输入内容" />
      </form>
    </div>
    <el-table :data="$page.rows" :empty-text="$page.error" >
      <el-table-column label="ID" prop="id" />
      <el-table-column label="Name" prop="name" />
      <el-table-column label="managerId" prop="managerId" />
      <el-table-column label="ManagerName">
        <template slot-scope="scope">
          <ManagerName :id="scope.row.managerId" />
        </template>
      </el-table-column>
      <el-table-column label="CreateTime">
        <template slot-scope="scope">
          <date-format :input="scope.row.created" />
        </template>
      </el-table-column>
      <el-table-column label="CreateDate">
        <template slot-scope="scope">
          <date-format :input="scope.row.created" format="L" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary" @click="$router.push(`detail/${scope.row.id}`)">详情</el-link>
          <el-link type="primary" @click="$router.push(`edit/${scope.row.id}`)">编辑</el-link>
          <button-delete :url="'/api/example/'+ scope.row.id" @success="$page.reload" link />
          <button-request
            :url="`/api/example/${scope.row.id}`"
            method="post"
            :payload="{disabled: false}"
            confirm-message="是否确认要上架?"
            success-message="上传成功"
            @success="$page.reload"
            link
          >上架</button-request>
          <button-request
            :url="`/api/example/${scope.row.id}`"
            method="post"
            :payload="{disabled: true}"
            confirm-message="是否确认要上架?"
            success-message="上传成功"
            @success="$page.reload"
            link
          >下架</button-request>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="$page" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ManagerName from '@/components/ManagerName';
import Pagination from '@/components/Pagination';
import ButtonDelete from '@/components/ButtonDelete';
import ButtonRequest from '@/components/ButtonRequest';
import DateFormat from '@/components/DateFormat';
import { pageMixin } from '@/mixin/page';

export default Vue.extend({
  mixins: [pageMixin],
  components: {
    ManagerName,
    Pagination,
    ButtonDelete,
    ButtonRequest,
    DateFormat,
  },
  page: {
    url: '/api/example',
    query({ keywords }) {
      return { keywords };
    },
  },
  data() {
    return { keywords: String(this.$route.query.keywords || '') };
  },
  methods: {
    handleSearch(this: Vue) {
      search(this, this.$data.keywords, 0);
    },
  },
  beforeDestroy(this: Vue & { _timer?: number }) {
    if (this._timer) { clearTimeout(this._timer); }
  },
  watch: {
    keywords: {
      handler(next) {
        search(this, next, 400);
      },
    },
  },
});
function search(vm: Vue & {_timer?: number}, keywords: string, delay: number) {
  if (vm._timer) { clearTimeout(vm._timer); }
  // eslint-disable-next-line no-param-reassign
  vm._timer = setTimeout(() => {
    // eslint-disable-next-line no-param-reassign
    vm._timer = 0;
    vm.$router.push({ query: { keywords } });
  }, delay);
}
</script>
