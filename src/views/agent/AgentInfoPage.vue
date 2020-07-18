<template>
  <div>
    <h1>AgentList</h1>
    <router-link to="/agent/info/create">创建</router-link>
    <ul>
      <li v-for="i in array" :key="i">
        <span>{{i}}</span>
        <router-link :to="'/agent/info/edit/' + i">编辑</router-link>
        <router-link :to="'/agent/info/detail/' + i">详情</router-link>
      </li>
    </ul>
    <li></li>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      array: [198172121, 118976121],
    };
  },
});
</script>
