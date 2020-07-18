<template>
  <div class="app">
    <Login v-if="!authorized" />
    <template v-else>
      <Topbar />
      <router-view />
    </template>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Topbar from './views/layout/Topbar.vue';
import Login from './components/Login.vue';
import store from './store';

export default Vue.extend({
  components: { Topbar, Login },
  computed: {
    authorized() {
      return store.state.auth.id !== 0;
    },
  },
});
</script>
