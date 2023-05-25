<template>
  <div class="map-chart" ref="mapChart"></div>
</template>
<script lang="ts" setup>
import { Ref, computed, markRaw, onMounted, ref } from 'vue';
import chongqingJson from './chongqing.json';
import * as echarts from 'echarts';
import './style';
defineOptions({ name: 'EchartsMap' });

/**
 * 地图实例
 */
let mapChartInstance: echarts.ECharts | null = null;

const stationMap: Ref<any> = ref([]);
// 地图
const selectedStationIndex: Ref<number | null> = ref(null);
const selectedStation = computed(() => {
  return selectedStationIndex.value !== null && stationMap.value.length
    ? stationMap.value[selectedStationIndex.value].NAME
    : '';
});
const mapChart = ref();
// 展示地图
function showMap(seriesData: any, lines: any[]) {
  const options = {
    tooltip: {
      show: true, //不显示提示标签
      formatter: '{b}', //提示标签格式
      backgroundColor: '#ff7f50', //提示标签背景颜色
      textStyle: {
        color: '#ffffff', //提示标签字体颜色
      },
    },
    geo: {
      map: 'chongqing',
      zlevel: 1,
      label: {
        show: true, //显示省份标签
        color: '#ffffff', //省份标签字体颜色
      },
      layoutCenter: ['50%', '50%'],
      layoutSize: '100%',
      aspectScale: 1, // 缩放
      itemStyle: {
        borderWidth: 2, //区域边框宽度
        borderColor: '#33c9ff', //区域边框颜色
        areaColor: '#1f4e66', //区域颜色
      },
      emphasis: {
        itemStyle: {
          borderWidth: 0.5,
          borderColor: '#33ddff',
          areaColor: '#ff0000',
        },
        label: {
          //对应的鼠标悬浮效果
          show: true,
          color: '#ffffff',
          // fontSize: 28,
        },
      },
    },
    series: [
      {
        name: 'station',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 18,
        zlevel: 3,
        label: {
          //对应的鼠标悬浮效果
          show: true,
          position: 'insideLeft',
          distance: 20,
          fontSize: 18,
          color: '#409eff',
          opacity: 1,
          formatter: '{b}',
        },
        data: [],
      },
      {
        name: '',
        type: 'lines',
        zlevel: 2,
        label: {
          //对应的鼠标悬浮效果
          show: false,
          fontSize: 18,
          color: '#ffffff',
          opacity: 1,
          position: 'middle',
        },
        emphasis: {
          label: {
            show: true,
          },
          lineStyle: {
            color: '#ff0',
          },
        },
        lineStyle: {
          type: 'solid',
          width: 2,
          opacity: 1,
          orient: 'horizontal',
          color: '#E84FFF',
        },
        show: true,
        // 经测试横向线 纬度 加减 0.04最合适 纵向线 则加减经度
        // 第一个为经度longitude 第二个为纬度latitude
        // 三根线时中间线 verticalAlign为middle 经纬度就是厂站的经纬度
        data: lines,
      },
    ],
  };
  mapChartInstance!.setOption(options);
}
onMounted(() => {
  mapChartInstance = markRaw(
    echarts.init(mapChart.value, undefined, {
      devicePixelRatio: 2,
      renderer: 'svg',
    }),
  );
  // mapChartInstance!.off('click', handleFn);
  // mapChartInstance!.off('dblclick', doubleFn);
  // mapChartInstance!.on('click', 'series', handleFn);
  // mapChartInstance!.on('dblclick', 'series', doubleFn);
  echarts.registerMap('chongqing', chongqingJson as any);
  showMap([], []);
});
</script>
