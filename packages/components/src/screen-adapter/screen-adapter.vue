<template>
  <div class="screen-adapter" :style="style">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  onMounted,
  onUnmounted,
  ref,
  computed,
} from 'vue';
import { debounce } from 'lodash';
import './style';
export default defineComponent({
  name: 'IScreenAdapter',
  props: {
    width: {
      type: String,
      default: '1920',
    },
    height: {
      type: String,
      default: '1080',
    },
  },
  setup(props) {
    const { width, height } = toRefs(props);
    const scaleRatio = ref(1);
    const style = computed(() => {
      return {
        width: width.value + 'px',
        height: height.value + 'px',
        transform: `scale(${scaleRatio.value}) translate(-50%, -50%)`,
      };
    });
    // 获取放大缩小比例 以小的为准
    const getScaleRatio = () => {
      const w = window.innerWidth / +width.value;
      const h = window.innerHeight / +height.value;
      scaleRatio.value = w < h ? w : h;
    };
    onMounted(() => {
      getScaleRatio();
      window.onresize = debounce(getScaleRatio, 300);
    });
    onUnmounted(() => {
      window.onresize = null;
    });
    return {
      style,
    };
  },
});
</script>
