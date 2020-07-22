<template>
  <span class="dateformat" v-text="value"></span>
</template>
<script lang="ts">
import Vue from 'vue';
import { formatDate, parseDate } from '@/utils/dateutils';

export default Vue.extend({
  props: {
    input: [String, Number, Date],
    format: {
      type: String,
      default: 'll',
    },
  },
  computed: {
    value() {
      const date = parseDate(this.input);
      const value = formatDate(date, this.format);
      return value;
    },
  },
});
</script>
<style scoped>
  .dateformat {
    font-family: Arial, sans-serif;
  }
</style>
