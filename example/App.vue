<template>
  <i-screen-adapter>
    <div>
      测试
      <i-button type="primary">测试</i-button>
      <el-datepickers
        v-model:selectUnit="selectUnit"
        v-model:selectDate="selectDate"
      ></el-datepickers>
    </div>
  </i-screen-adapter>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import dayjs from 'dayjs';
const selectDate = ref(dayjs().toDate());
const selectUnit: Ref<'date' | 'week' | 'month'> = ref('month');
</script>
