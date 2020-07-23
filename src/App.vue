<template>
  <Login v-if="!authorized" />
  <Layout v-else @logout="logout" logo="el-icon-platform-eleme" brand="Logo"></Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import Login from './components/Login';
import Layout from './components/Layout';
import { state, logout } from './store/authStore';

export default Vue.extend({
  components: { Login, Layout },
  computed: {
    authorized: () => state.id !== '',
  },
  methods: {
    logout,
  },
});
</script>
