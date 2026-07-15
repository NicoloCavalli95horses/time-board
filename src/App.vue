<template>
  <div class="main">
    <Nav />

    <div class="time-info">
      <div class="wrapper">
        <p>{{ translate("exit time") }}<span>{{ minutesToTime(outTimeMin) }}</span> </p>
        <TimeProgress :min="timeToMinutes(inTime)" :max="outTimeMin" />
      </div>
    </div>

    <h2>{{ translate("settings") }}</h2>
    <div class="grid">
      <div class="card">
        <p>{{ translate("working hours") }}</p>
        <Counter v-model:count="workingHours" :label="translate('hours')" />
      </div>

      <div class="card">
        <p>{{ translate("entry time") }}</p>
        <InputTime v-model:time="inTime" />
      </div>

      <div class="card">
        <p>{{ translate("lunch break duration") }}</p>
        <Counter v-model:count="lunchBreakTimeMin" :incr="15" :label="translate('minutes')" />
      </div>
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
import Nav from './components/Nav.vue';
import { translate } from './i18n.js';


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
.main {
  margin: 0 22px;
  .grid {
    display: flex;
    flex-direction: column;
  }
}

span {
  font-family: monospace;
  font-size: 42px;
}

.time-info {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.5), rgba(12, 1, 111, 0.4));
  height: 100%;
  margin-top: 22px;
  border-radius: 12px;

  .wrapper {
    margin: 0 20px 0 20px;
    padding-top: 24px;
    padding-bottom: 84px;
  }

  span {
    font-size: 32px;
    border: 1px solid white;
    padding: 4px;
    margin-left: 10px;
    border-radius: 4px;
  }
}

.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 12px;
  padding: 16px 24px;
  margin-top: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, .05);
  background-color: rgba(51, 68, 68, 0.4);

  &:first-of-type {
    margin-top: 0px;
  }
}
</style>
