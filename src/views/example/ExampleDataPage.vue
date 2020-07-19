<template>
  <div>
    <h1>Example Page</h1>
    <router-link to="create">创建</router-link>
    <ul>
      <li v-for="(id) in array" :key="id">
        <span>{{id}}</span>
        <span>创建人</span>
        <ManagerName :id="id.substring(0, 2)"/>
        <router-link :to="'edit/'+id">编辑</router-link>
        <router-link :to="'detail/'+id">详情</router-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ManagerName from '@/components/ManagerName';

export default Vue.extend({
  components: { ManagerName },
  data() {
    return {
      array: '1872,121261,621521,19172'.split(','),
    };
  },
});
</script>
