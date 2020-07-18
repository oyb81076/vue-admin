<template>
  <div>
    <div>
      id: <input type="text" v-model="id">
    </div>
    <div>
      role: <input type="number" v-model="role">
    </div>
    <button @click="login">Login </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { Role } from '@/models';

export default Vue.extend({
  data() {
    return {
      id: 0,
      role: Role.MANAGER,
    };
  },
  methods: {
    login() {
      const jwt = `s0f7.${btoa(JSON.stringify({
        id: Date.now(),
        role: 0,
        exp: Math.floor(Date.now() / 1000) + 100000,
      }))}.s0sf`;
      store.commit('login', jwt);
    },
  },
});
</script>
<style lang="scss">
</style>
