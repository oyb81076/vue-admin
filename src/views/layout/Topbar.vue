<template>
  <header class="topbar">
    <router-link to="/" exact class="brand">Brand</router-link>
    <div class="links">
      <router-link to="/example">Example</router-link>
      <router-link to="/agent">Agent</router-link>
      <router-link to="/product">Product</router-link>
      <router-link to="/code">Code</router-link>
    </div>
    <a href="#" @click.prevent="logout">log out</a>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { logout } from '@/store/authStore';

export default Vue.extend({
  methods: {
    logout() {
      logout();
    },
  },
});
</script>
