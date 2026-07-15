<template>
  <nav>
    <div class="time-icon">⏳</div>
    <h1 class="grow t-center">Time board</h1>
  </nav>
  <div class="grid">
    <div class="card">
      <p>Oggi devo lavorare</p>
      <div class="flex">
        <Counter v-model:count="workingHours" label="ore" />
      </div>
    </div>

    <div class="card">
      <p>Orario di ingresso</p>
      <InputTime v-model:time="inTime" />
    </div>

    <div class="card">
      <p>Durata della pausa pranzo</p>
      <Counter v-model:count="lunchBreakTimeMin" :incr="15" label="minuti" />
    </div>    
  </div>

    <div class="info">
      <div class="wrapper">
        <p>Orario di uscita<span>{{ minutesToTime(outTimeMin) }}</span> </p>
        <TimeProgress :min="timeToMinutes(inTime)" :max="outTimeMin" />
      </div>
    </div>
</template>


<script setup>
//===========================
// Import
//===========================
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { minutesToTime } from './utils';

import InputTime from './components/InputTime.vue'
import Counter from './components/Counter.vue'
import TimeProgress from './components/TimeProgress.vue';


//===========================
// Consts
//===========================
const workingHours = ref(8);
const lunchBreakTimeMin = ref(45);
const inTime = ref('08:30');

const outTimeMin = computed(() =>
  timeToMinutes(inTime.value) +
  workingHours.value * 60 +
  lunchBreakTimeMin.value
);


//===========================
// Functions
//===========================
function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 12px;
  margin: 12px;
}

span {
  font-family: monospace;
  font-size: 42px;
}

.info {
  background-color: rgba(37, 99, 235, 0.2);
  height: 100%;
  .wrapper  {
    margin: 0 20px 0 20px;
    padding: 54px 0;
  }
  span {
    font-size: 32px;
    border: 1px solid white;
    padding: 4px;
    margin-left: 10px;
    border-radius: 4px;
  }
}

.time-icon {
  font-size: 44px;
}

.card {
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, .05);
  background-color: rgba(51, 68, 68, 0.4);
}
</style>
