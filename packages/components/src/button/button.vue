<template>
  <button class="i-button" :class="buttonStyle">测试按钮</button>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import './style';
defineOptions({ name: 'i-button' });

interface ButtonProps {
  type?: string;
}

const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  return { [`i-button--${buttonProps.type}`]: buttonProps.type };
});
</script>
