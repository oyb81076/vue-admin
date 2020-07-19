<template>
  <div>
    <div>
      id: <input type="text" v-model.trim="id">
    </div>
    <div>
      role: <input type="number" v-model.number="role">
    </div>
    <button @click="login">Login </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { login } from '@/store/authStore';
import { ManagerRole } from '@/models';

export default Vue.extend({
  data() {
    return {
      id: '2',
      role: ManagerRole.MANAGER,
    };
  },
  methods: {
    login() {
      const jwt = `s0f7.${btoa(JSON.stringify({
        id: this.id,
        role: this.role,
        exp: Math.floor(Date.now() / 1000) + 100000,
      }))}.s0sf`;
      login(jwt);
    },
  },
});
</script>
<style lang="scss">
</style>
