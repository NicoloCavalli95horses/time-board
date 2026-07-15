<template>
  <div class="bar">
    <div class="progress-wrapper">
      <progress :value="progress" :max="100" />
      <span class="label" :style="{ 'left': `${progress}%` }">
        {{ Math.round(progress) }}%
      </span>
    </div>
    <div class="flex">
      <div>{{ minutesToTime(min) }}</div>
      <div class="grow"></div>
      <div>{{ minutesToTime(max) }}</div>
    </div>
  </div>
</template>

<script setup>
//===========================
// Import
//===========================
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { minutesToTime } from "../utils";


//===========================
// Props and emits
//===========================
const props = defineProps({
  min: Number,
  max: Number,
});

//===========================
// Props and emits
//===========================
const now = ref(new Date());

const currentMinutes = computed(() =>
  now.value.getHours() * 60 + now.value.getMinutes()
);

const progress = computed(() => {
  const total = props.max - props.min;
  const elapsed = currentMinutes.value - props.min;

  return Math.min(100, Math.max(0, elapsed / total * 100));
});



//===========================
// Life cycle
//===========================
onMounted(() => {
  const interval = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => clearInterval(interval));

</script>

<style lang="scss" scoped>
.bar {
  height: 40px;
}

.progress-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  progress {
    width: 100%;
    height: 100%;
    appearance: none;
    -webkit-appearance: none;
    border: none;
  }

  .label {
    position: absolute;
    top: 50%;
    font-size: 18px;
    transform: translate(-120%, -50%);
  }
}

progress::-webkit-progress-bar {
  background: #e5e7eb;
}

progress::-webkit-progress-value {
  background: #2563eb;
}
</style>