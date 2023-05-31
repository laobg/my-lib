<template>
  <div class="map-wrapper">
    <div class="map-chart" ref="mapChart"></div>
    <div
      class="map-chart popup-map"
      :style="computedStyle"
      ref="popoupMapChart"
      @mouseleave="showPopupMap = false"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { Ref, computed, markRaw, onMounted, reactive, ref } from 'vue';
import chongqingJson from './chongqing_custom.json';
import chongqingMainJson from './chongqing_main.json';
import * as echarts from 'echarts';
import './style';
defineOptions({ name: 'EchartsMap' });

/**
 * 地图实例
 */
let mapChartInstance: echarts.ECharts | null = null;
let popupMapChartInstance: echarts.ECharts | null = null;

const showPopupMap = ref(false);
const stationMap: Ref<any> = ref([]);

const popupMapStyle = reactive({
  top: '0px',
  left: '0px',
});
const computedStyle = computed(() => {
  return {
    top: popupMapStyle.top,
    left: popupMapStyle.left,
    zIndex: showPopupMap.value ? 10 : -1,
    opacity: showPopupMap.value ? 1 : 0,
  };
});
// 地图
const selectedStationIndex: Ref<number | null> = ref(null);
const selectedStation = computed(() => {
  return selectedStationIndex.value !== null && stationMap.value.length
    ? stationMap.value[selectedStationIndex.value].NAME
    : '';
});
const mapChart = ref();
const popoupMapChart = ref();
// 展示地图
function showMap(instance: any, mapName: string) {
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
      map: mapName,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zlevel: 1,
      label: {
        show: true, //显示省份标签
        color: '#ffffff', //省份标签字体颜色
      },
      // layoutCenter: ['50%', '50%'],
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
        // data: lines,
      },
    ],
  };
  instance!.setOption(options);
}
onMounted(() => {
  mapChartInstance = markRaw(
    echarts.init(mapChart.value, undefined, {
      devicePixelRatio: 2,
      renderer: 'svg',
    }),
  );
  popupMapChartInstance = markRaw(
    echarts.init(popoupMapChart.value, undefined, {
      devicePixelRatio: 2,
      renderer: 'svg',
    }),
  );
  mapChartInstance.on('mouseover', function (params) {
    if (params.name === '主城区') {
      showPopupMap.value = true;
      popupMapStyle.top = (params.event?.offsetY || 0) + 'px';
      popupMapStyle.left = (params.event?.offsetX || 0) + 'px';
    } else {
      showPopupMap.value = false;
    }
  });
  popupMapChartInstance.on('globalout', () => {
    showPopupMap.value = false;
  });
  // mapChartInstance!.off('click', handleFn);
  // mapChartInstance!.off('dblclick', doubleFn);
  // mapChartInstance!.on('click', 'series', handleFn);
  // mapChartInstance!.on('dblclick', 'series', doubleFn);
  echarts.registerMap('chongqing', chongqingJson as any);
  echarts.registerMap('chongqingMain', chongqingMainJson as any);
  showMap(mapChartInstance, 'chongqing');
  showMap(popupMapChartInstance, 'chongqingMain');
});
</script>
