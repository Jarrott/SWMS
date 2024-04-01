<template>
  <qc-select
    class="qc-time-select"
    :value="prop.value"
    :options="options.data"
    :placeholder="prop.placeholder"
    :icon="prop.icon"
    @change="handleChange"
  >
  </qc-select>
</template>

<script lang="ts" setup>
interface Props {
  value?: any;
  placeholder?: string;
  icon?: any; //前缀-图标
  start?: any; //开始时间
  end?: any; //结束时间
  step?: any; //间隔时间
  maxTime?: any; // 最晚时间点，晚于该时间的时间段将被禁用
  minTime?: any; // 最早时间点，早于该时间的时间段将被禁用
}
let prop = withDefaults(defineProps<Props>(), {
  value: undefined as unknown,
  placeholder: '请选择',
  icon: 'Clock',
  start: '00:00',
  end: '24:00',
  step: '00:30',
  maxTime: '',
  minTime: '',
});

let options = reactive({
  data: [] as any,
});

interface Time {
  hours: number;
  minutes: number;
}
const parseTime = (time: string): null | Time => {
  const values = (time || '').split(':');
  if (values.length >= 2) {
    let hours = Number.parseInt(values[0], 10);
    const minutes = Number.parseInt(values[1], 10);
    const timeUpper = time.toUpperCase();
    if (timeUpper.includes('AM') && hours === 12) {
      hours = 0;
    } else if (timeUpper.includes('PM') && hours !== 12) {
      hours += 12;
    }
    return {
      hours,
      minutes,
    };
  }

  return null;
};
const compareTime = (time1: string, time2: string): number => {
  const value1 = parseTime(time1);
  if (!value1) return -1;
  const value2 = parseTime(time2);
  if (!value2) return -1;
  const minutes1 = value1.minutes + value1.hours * 60;
  const minutes2 = value2.minutes + value2.hours * 60;
  if (minutes1 === minutes2) {
    return 0;
  }
  return minutes1 > minutes2 ? 1 : -1;
};

const padTime = (time: number | string) => {
  return `${time}`.padStart(2, '0');
};
const formatTime = (time: Time): string => {
  return `${padTime(time.hours)}:${padTime(time.minutes)}`;
};

const nextTime = (time: string, step: string): string => {
  const timeValue = parseTime(time);
  if (!timeValue) return '';

  const stepValue = parseTime(step);
  if (!stepValue) return '';

  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes,
  };
  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;
  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;
  return formatTime(next);
};

watch(
  () => prop.maxTime,
  (newVal, oldVal) => {
    options.data = getList();
  }
);

watch(
  () => prop.minTime,
  (newVal, oldVal) => {
    options.data = getList();
  }
);

const getList = () => {
  const result: { value: string; label: string; disabled: boolean }[] = [];
  if (prop.start && prop.end && prop.step) {
    let current = prop.start;
    // let currentTime: string
    while (current && prop.end && compareTime(current, prop.end) <= 0) {
      // currentTime = dayjs(current, 'HH:mm').format('HH:mm')
      result.push({
        label: current,
        value: current,
        disabled:
          compareTime(current, prop.minTime || '-1:-1') <= 0 ||
          compareTime(current, prop.maxTime || '100:100') >= 0,
      });
      current = nextTime(current, prop.step!);
    }
  }
  return result;
};
options.data = getList();

const emit = defineEmits(['change']);
const handleChange = (e: any) => {
  emit('change', e);
};
</script>

<style lang="scss">
.qc-time-select {
  .qc-select-icon {
    position: relative;
  }
}
</style>