<template>
  <div class="condition-left">
    查询单位：
    <el-select
      :modelValue="selectUnit"
      placeholder="请选择"
      :class="unitClass"
      @change="unitChange"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    日期：
    <!-- eslint-disable vue/v-on-event-hyphenation -->
    <el-date-picker
      :modelValue="selectDate"
      @update:modelValue="dateChange"
      :type="selectUnit"
      :format="selectUnit === 'week' ? '[第] ww [周]' : undefined"
      :class="dateClass"
      placeholer="请选择"
      :clearable="false"
      :editable="false"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, withDefaults, toRefs } from 'vue';
import { ElDatePicker, ElSelect, ElOption, DatePickType } from 'element-plus';
import 'element-plus/es/components/date-picker/style/css';
import 'element-plus/es/components/select/style/css';
export interface Props {
  selectUnit: DatePickType;
  selectDate: string | Date | number;
  unitClass?: string;
  dateClass?: string;
}

defineOptions({ name: 'ElDatepickers' });
const props = withDefaults(defineProps<Props>(), {
  selectUnit: 'date',
});
const { selectUnit, selectDate, unitClass, dateClass } = toRefs(props);
const emit = defineEmits(['update:selectUnit', 'update:selectDate']);
const selectOptions = ref([
  {
    value: 'date',
    label: '日',
  },
  {
    value: 'week',
    label: '周',
  },
  {
    value: 'month',
    label: '月',
  },
]);
const dateChange = (date: any) => {
  emit('update:selectDate', date);
};
const unitChange = (unit: any) => {
  emit('update:selectUnit', unit);
  switch (unit) {
    case 'date':
      emit('update:selectDate', dayjs().toDate());
      break;
    case 'week':
      emit('update:selectDate', dayjs().day(0).toDate());
      break;
    case 'month':
      emit('update:selectDate', dayjs().date(1).toDate());
      break;
    default:
  }
};
</script>
