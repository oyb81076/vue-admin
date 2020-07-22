<template>
  <div class="app">
    <Login v-if="!authorized" />
    <template v-else>
      <Topbar />
      <router-view class="main" />
    </template>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Topbar from './views/layout/Topbar.vue';
import Login from './components/Login';
import { state } from './store/authStore';

export default Vue.extend({
  components: { Topbar, Login },
  computed: {
    authorized() {
      return state.id !== '';
    },
  },
});
</script>
